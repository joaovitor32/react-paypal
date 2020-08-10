import React from "react";
import {Paypal} from "./components/Payment";

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
        commit={true}
        style={{
          size: "small",
          color: "gold",
          shape: "pill",
        }}
    />)
  ;
}

export default App;
