import { useCallback } from 'react';
import { onShippingChange } from '../types/onShippingChange'
import { PaypalType } from '../types/Paypal';

const usePaypalOptions = ({amount,currency}:PaypalType) => {
  const createOrderPaypal = useCallback(async (data: any, actions: any) => {
    // This function sets up the details of the transaction, including the amount and line item details.
    return await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    })
  }, [amount]);

  const onApprovePaypal = useCallback(async (data: any, actions: any) => {
    return await actions.order.capture();
  }, []);

  const onShippingChangePaypal = useCallback(async ({ data, actions }: onShippingChange) => {

    if(!amount&&!currency){
      return actions.resolve()
    }

    return await actions.order.patch([
      {
        op: 'replace',
        path: '/purchase_units/@reference_id==\'default\'/amount',
        value: {
          currency_code: currency,
          value: (parseFloat(amount)).toFixed(2),
          breakdown: {
            item_total: {
              currency_code: currency,
              value: "0.01"
            },
            shipping: {
              currency_code: currency,
              value:amount
            }
          }
        }
      }
    ]);
  }, [currency,amount]);

  return { createOrderPaypal, onApprovePaypal,onShippingChangePaypal  };
};

export default usePaypalOptions;