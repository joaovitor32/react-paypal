import React, { useEffect, useCallback, useRef } from "react";
import { useDataPaypal } from "../../hooks/useDataPaypal";
import { PaypalType } from "../../types/Paypal";

declare global {
  interface Window {
    paypal: any;
  }
}

function Paypal(props: PaypalType) {
  const { style, env, client, locale, commit,amount, clientId } = props;

  const { isReady, setIsready } = useDataPaypal();
  const divPaypalContainer = useRef(null);

  const addPaypalSdk = useCallback(async () => {
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.async = true;
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;

    script.onerror = () => {
      throw new Error("Paypal SDK could not be loaded.");
    };

    script.onload = () => {
      setIsready(true);
    };

    document.body.appendChild(script);
  }, [setIsready, clientId]);

  const createOrderPaypal=(data:any,actions:any)=>{
      // This function sets up the details of the transaction, including the amount and line item details.
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '0.01'
          }
        }]
      })
  }

  const onOrderPaypal=(data:any,actions:any)=>{
    return actions.order.capture().then(function(details:any) {
      // This function shows a transaction success message to your buyer.
      alert('Transaction completed by ' + details.payer.name.given_name);
    });
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.paypal === undefined) {
      addPaypalSdk();
    } else {
      if (isReady) {
        window.paypal.Buttons(
          {
            createOrder:(data:any,actions:any)=>{createOrderPaypal(data,actions)},
            onApprove:(data:any,actions:any)=>{onOrderPaypal(data,actions)},
          }
        ).render(divPaypalContainer.current);
      }
    }
  }, [addPaypalSdk, isReady]);

  return isReady ? <div ref={divPaypalContainer}></div> : <h2>Loading</h2>;
}

export { Paypal };
