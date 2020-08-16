export interface onShippingChange {
   data:{
    orderId:string,
    paymentId:string,
    paymentToken:string,
    shipping_address:{
        city: string;
        country_code: string;
        postal_code: string;
        state: string;
      },
    selected_shipping_option:string,
   },
   actions:{
    resolve:any,
    reject:any,
    order:any,
   }
}