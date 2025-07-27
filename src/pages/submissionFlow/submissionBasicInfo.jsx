import React, {useEffect, useState} from "react";
import Steps from "../../components/submissionSteps.jsx";
import Nav2 from "../../components/nav2.jsx";
import AuthorizerInfo from "../../components/authorizerInfo.jsx";
import Authorizers from "../../components/authorizers.jsx";
import SubmissionInfo from "../../components/submissionInfo.jsx";


export default function SubmissionHome() {
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    // Get all required values from localStorage
    const submitter = localStorage.getItem('submitter') || '';
    const title = localStorage.getItem('title') || '';
    const year = localStorage.getItem('year') || '';
    const duration = localStorage.getItem('duration') || '';
    const description = localStorage.getItem('description') || '';
    const genre = localStorage.getItem('genre') || '';
    const rating = localStorage.getItem('rating') || '';
    const warning = localStorage.getItem('warning') || '';

    // Check if any required field is empty
    if (!submitter.trim() || 
        !title.trim() || 
        !year.trim() || 
        !duration.trim() || 
        !description.trim() || 
        !genre.trim() || 
        !rating.trim() || 
        !warning.trim()) {
      alert("Please fill out all required information");
      return false;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if submitter email is valid
    if (!emailRegex.test(submitter.trim())) {
      alert("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      // If validation passes, navigate to next step
      window.location.href = '/submit/submissionlinks';
    }
  };

  return (
    <div style={{ backgroundColor: "#160016" }}>
      <br />
      <br />
      <br />
      <Steps num={2}/>
      <br />
      <br />
      <AuthorizerInfo />
      <br />
      <br />
      <hr style={{ width: "35vw", color: "#654265", backgroundColor: "#654265", height:"1px", margin:"auto" }} />
      <br />
      <SubmissionInfo onNextStep={handleNextStep} />
      <br />
      <hr style={{ width: "100", color: "#654265", backgroundColor: "#654265", height:"1px", margin:"auto" }} />
      
    </div>
  );
}
