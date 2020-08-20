import {StandardCardFields} from './StandardCardFields';

export interface PaypalType {
    styleProp?: {
        layout?:string,
        color?:string,
        shape?:string,
        label?:string
    },
    env: string,
    client: {
        sandbox: string,
        production: string
    }
    locale: string,
    commit: boolean,
    clientId:string,
    amount:string,
    currency:string,
    standardCardFields?:StandardCardFields

}