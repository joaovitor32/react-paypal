import React,{useCallback} from 'react';

const usePaypalOptions = () => {
    const createOrderPaypal =useCallback(async(data: any, actions: any) => {
        // This function sets up the details of the transaction, including the amount and line item details.
        return await actions.order.create({
          purchase_units: [
            {
              amount: {
                value: "0.01",
              },
            },
          ],
        }).then(function(res:any) {
          return res.json();
        }).then(function(data:any) {
          console.log(data)
          return data.token;
        });;
      },[]);
    
      const  onApprovePaypal =useCallback(async (data: any, actions: any)=> {
        return await actions.order.capture().then(function (details: any) {
          // This function shows a transaction success message to your buyer.
          alert("Transaction completed by " + details.payer.name.given_name);
        });
      },[]);

      return {createOrderPaypal,onApprovePaypal};
};

export default usePaypalOptions;