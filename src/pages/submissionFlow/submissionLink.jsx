import React, {useEffect, useState} from "react";
import Steps from "../../components/submissionSteps.jsx";
import Nav2 from "../../components/nav2.jsx";
import TechnicalRequirements from "../../components/technicalRequirements.jsx";
import SubmissionLinks from "../../components/submissionLinks.jsx";

export default function SubmissionHome() {
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    // Get vlink from localStorage
    const vlink = localStorage.getItem('vlink') || '';

    // Check if vlink is empty
    if (!vlink.trim()) {
      alert("Please fill out the video link");
      return false;
    }

    // URL validation regex - checks for common URL patterns
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    
    // Check if the link matches URL format
    if (!urlRegex.test(vlink.trim())) {
      alert("Please enter a valid URL (e.g., https://example.com or example.com)");
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      // If validation passes, navigate to next step
      window.location.href = '/submit/submissionproduction';
    }
  };

  return (
    <div style={{ backgroundColor: "#160016" }}>
      <br />
      <br />
      <br />
      <Steps num={3}/>
      <br />
      <br />
      <TechnicalRequirements />
      <hr style={{ width: "35vw", color: "#654265", backgroundColor: "#654265", height:"1px", margin:"auto" }} />
      <br />
      <SubmissionLinks onNextStep={handleNextStep} />
      <br />
      <hr style={{ width: "100", color: "#654265", backgroundColor: "#654265", height:"1px", margin:"auto" }} />
      
    </div>
  );
}