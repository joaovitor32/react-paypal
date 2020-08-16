import React, { useEffect, useCallback, useRef } from "react";

import { useDataPaypal } from "../../hooks/useDataPaypal";
import usePaypalOptions from "../../hooks/usePaypalOptions";

import { PaypalType } from "../../types/Paypal";
import { onShippingChange } from "../../types/onShippingChange";

declare global {
  interface Window {
    paypal: any;
  }
}

function Paypal(props: PaypalType) {
  const { style, env, client, locale, commit, amount, clientId } = props;

  const {
    isReady,
    setIsready,
    details,
    setDetails,
    error,
    setError,
  } = useDataPaypal();

  const {
    onApprovePaypal,
    createOrderPaypal,
    onShippingChangePaypal,
  } = usePaypalOptions(props);

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

  useEffect(() => {
    if (typeof window !== "undefined" && window.paypal === undefined) {
      addPaypalSdk();
    } else {
      if (isReady) {
        window.paypal
          .Buttons({
            createOrder: (data: any, actions: any) =>createOrderPaypal(data, actions),
            onApprove: (data: any, actions: any) =>
              onApprovePaypal(data, actions)
                .then((details: any) => {
                  setDetails(details);
                })
                .catch((err) => {
                  setError(err);
                }),
            onShippingChange: ({ data, actions }: onShippingChange) =>onShippingChangePaypal({ data, actions }),
          })
          .render(divPaypalContainer.current);
      }
    }
  }, [
    addPaypalSdk,
    isReady,
    createOrderPaypal,
    onApprovePaypal,
    onShippingChangePaypal,
    setDetails,
    setError
  ]);

  return isReady ? <div ref={divPaypalContainer}></div> : <h2>Loading</h2>;
}

export { Paypal };
