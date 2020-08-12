export interface PaypalType {
    style: {},
    env: string,
    client: {
        sandbox: string,
        production: string
    }
    locale: string,
    commit: boolean,
    clientId:string,
    amount:string,    
}