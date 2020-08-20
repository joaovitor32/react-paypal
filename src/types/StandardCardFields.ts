export interface StandardCardFields {
    intent: string,
    payer: {
        name: {
            given_name: string,
            surname: string
        },
        address: {
            address_line_1: string,
            address_line_2: string,
            admin_area_2: string,
            admin_area_1: string,
            postal_code: string,
            country_code: string
        },
        email_address: string,
        phone: {
            phone_type: string,
            phone_number: {
                national_number: string
            }
        }
    },
    purchase_units:
    {
        shipping: {
            address: {
                address_line_1: string,
                address_line_2: string,
                admin_area_2: string,
                admin_area_1: string,
                postal_code: string,
                country_code: string
            }
        }
    }
}