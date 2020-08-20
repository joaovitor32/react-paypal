import React, { useEffect, useCallback, useRef } from "react";

import { PaypalType } from "../../types/Paypal";
import { onShippingChange } from "../../types/onShippingChange";

import { useDataPaypal } from "../../hooks/useDataPaypal";
import usePaypalOptions from "../../hooks/usePaypalOptions";

import { StandardCardFields } from "../../types/StandardCardFields";

import ModalMessage from "../Modal/index";

declare global {
  interface Window {
    paypal: any;
  }
}

function Paypal(props: PaypalType) {
  const {
    styleProp,
    env,
    client,
    locale,
    commit,
    amount,
    clientId,
    standardCardFields,
  } = props;
  const divPaypalContainer = useRef(null);

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

  const handleError = useCallback(
    (err: any) => {
      setError(true);
      return <ModalMessage err={err} setError={setError} />;
    },
    [setError]
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.paypal === undefined) {
      addPaypalSdk();
    } else {
      if (isReady) {
        window.paypal
          .Buttons(
            {
              style: {
                layout: styleProp?.layout ? styleProp.layout : "vertical",
                color: styleProp?.color ? styleProp.color : "blue",
                shape: styleProp?.shape ? styleProp.shape : "rect",
                label: styleProp?.label ? styleProp.label : "paypal",
              },
            },
            {
              enableStandardCardFields: !!standardCardFields,
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
              onCancel: () => setIsready(false),
              onError: (err: any) => handleError(err),
            }
          )
          .render(divPaypalContainer.current);
      }
    }
  }, [
    addPaypalSdk,
    isReady,
    setIsready,
    createOrderPaypal,
    onApprovePaypal,
    onShippingChangePaypal,
    setDetails,
    setError,
    handleError,
    styleProp,
    standardCardFields,
  ]);

  return isReady ? <div ref={divPaypalContainer}></div> : <h2>Loading</h2>;
}

export { Paypal };
