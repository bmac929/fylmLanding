import React, {useEffect, useState} from "react";
import Steps from "../../components/submissionSteps.jsx";
import Nav2 from "../../components/nav2.jsx";
import PaymentOptions from "../../components/paymentOptions.jsx";

export default function SubmissionHome() {
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  useEffect(() => {
    console.log('Payment Options page loaded');
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    // Get payment option from localStorage
    const payment = localStorage.getItem('payment') || '';

    // Check if payment option is selected
    if (!payment.trim()) {
      alert("Please select a payment option");
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      // If validation passes, proceed with submission
      // The PaymentOptions component will handle the actual submission
      return true;
    }
    return false;
  };
  
  console.log('Payment Options page rendering');
  
  return (
    <div style={{ backgroundColor: "#160016" }}>
      <br />
      <br />
      <br />
      <Steps num={5}/>
      <br />
      <br />
      <PaymentOptions onNextStep={handleNextStep} />
      <br />
      <br />
        <hr style={{ width: "100", color: "#654265", backgroundColor: "#654265", height:"1px", margin:"auto" }} />
      
    </div>
  );
}