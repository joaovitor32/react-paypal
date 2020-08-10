import React, { useEffect, useCallback } from "react";
import { useDataPaypal } from "../../hooks/useDataPaypal";
import { PaypalType } from "../../types/Paypal";

declare global {
  interface Window {
    paypal: any;
  }
}

function Paypal(props: PaypalType) {
  const { style, env, client, locale, commit } = props;
  const {isReady,setIsready} = useDataPaypal();

  const addPaypalSdk = useCallback(async() => {
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.async = true;
    script.src = "https://www.paypalobjects.com/api/checkout.js";
    
    script.onerror = () => {
      throw new Error("Paypal SDK could not be loaded.");
    };
    
    script.onload=()=>{
      setIsready(true);
    }

    document.body.appendChild(script);
  }, [setIsready]);

  useEffect(() => {
    if (
      typeof(window) !== 'undefined' &&
      window.paypal === undefined
    ) {
      addPaypalSdk();
    }
  }, [addPaypalSdk]);

  if(isReady){
    console.log(window.paypal);
  }
  return (
    isReady?<h2>Not Loading</h2>:<h2>Loading</h2>
  );
}

export { Paypal };
