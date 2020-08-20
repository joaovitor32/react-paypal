import { useCallback } from 'react';
import { onShippingChange } from '../types/onShippingChange'
import { PaypalType } from '../types/Paypal';

import {StandardCardFields} from '../types/StandardCardFields';

const usePaypalOptions = ({ amount, currency, standardCardFields }: PaypalType) => {

  let cardField= standardCardFields as StandardCardFields;

  const createOrderPaypal = useCallback(async (data: any, actions: any) => {
    // This function sets up the details of the transaction, including the amount and line item details.
    
    let checkCardFieldExistence=!!cardField;

    if (checkCardFieldExistence) {
      return await actions.order.create({
        purchase_units: [
          {
            amount: {
              value: amount,
            },
          },
        ],
      })
    } else {
      return actions.order.create({
        intent: cardField.intent,
        payer: {
          name: {
            given_name: cardField.payer.name.given_name,
            surname: cardField.payer.name.surname
          },
          address: {
            address_line_1: cardField.payer.address.address_line_1,
            address_line_2: cardField.payer.address.address_line_2,
            admin_area_2: cardField.payer.address.admin_area_1,
            admin_area_1: cardField.payer.address.admin_area_2,
            postal_code: cardField.payer.address.postal_code,
            country_code: cardField.payer.address.country_code
          },
          email_address: cardField.payer.email_address,
          phone: {
            phone_type:cardField.payer.phone.phone_type,
            phone_number: {
              national_number: cardField.payer.phone.phone_type
            }
          }
        },
        purchase_units: [
          {
            amount: {
              value: amount,
              currency_code: currency
            },
            shipping: {
              address: {
                address_line_1: cardField.purchase_units.shipping.address.address_line_1,
                address_line_2: cardField.purchase_units.shipping.address.address_line_2,
                admin_area_2: cardField.purchase_units.shipping.address.admin_area_1,
                admin_area_1: cardField.purchase_units.shipping.address.admin_area_2,
                postal_code: cardField.purchase_units.shipping.address.postal_code,
                country_code: cardField.purchase_units.shipping.address.country_code
              }
            },
          }
        ]
      });
    }
  }, [amount,cardField,currency]);

  const onApprovePaypal = useCallback(async (data: any, actions: any) => {
    return await actions.order.capture();
  }, []);

  const onShippingChangePaypal = useCallback(async ({ data, actions }: onShippingChange) => {

    if (!!amount) {
      return actions.reject()
    }

    if (data.shipping_address.country_code !== currency) {
      return actions.reject();
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
              value: amount
            }
          }
        }
      }
    ]);
  }, [currency, amount]);

  return { createOrderPaypal, onApprovePaypal, onShippingChangePaypal };
};

export default usePaypalOptions;

