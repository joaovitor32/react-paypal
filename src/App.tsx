import React from "react";
import { Paypal } from "./components/Payment";

function App() {
  return (
    <Paypal
      env="sandbox"
      locale="en_US"
      client={{
        sandbox:
          "AT-V19dEqjCNHPjo34HRbVBLRv09pQ2jXXIhjhIcCXBww9bnEAngt7AS4TNkR3DpA_jZmw-yoGMJaTcQ",
        production:
          "AZIsHehWm53iA5wDFRn6_84Sg5kx0ZYo4KduVj9AD-kwGY2TmATj5-C03Em3mwynbEMWIO7JagDGPAhA",
      }}
      clientId={
        "AT-V19dEqjCNHPjo34HRbVBLRv09pQ2jXXIhjhIcCXBww9bnEAngt7AS4TNkR3DpA_jZmw-yoGMJaTcQ"
      }
      commit={true}
      amount={"0.01"}
      currency={"BRL"}
      
      styleProp={{
        layout: undefined,
        color: undefined,
        shape: "pill",
        label: undefined,
      }}

      standardCardFields={{
        intent: "CAPTURE",
        payer: {
          name: {
            given_name: "Paypal",
            surname: "Customer",
          },
          address: {
            address_line_1: "123 ABC Street",
            address_line_2: "Apt 2",
            admin_area_2: "San Jose",
            admin_area_1: "CA",
            postal_code: "95121",
            country_code: "US",
          },
          email_address: "customer@domain.com",
          phone: {
            phone_type: "MOBILE",
            phone_number: {
              national_number: "14082508100",
            },
          },
        },
        purchase_units: {
          shipping: {
            address: {
              address_line_1: '2211 N First Street',
              address_line_2: 'Building 17',
              admin_area_2: 'San Jose',
              admin_area_1: 'CA',
              postal_code: '95131',
              country_code: 'US'
            }
          },
        },
      }}
    />
  );
}

export default App;
