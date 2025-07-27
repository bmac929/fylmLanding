import React from "react";
import Steps from "../../components/submissionSteps";
import Guideline from "../../components/submissionGuideline";
import Nav2 from "../../components/nav2";
import ResumeSubmission from "../../components/ResumeSubmission";

export default function SubmissionHome() {
  return (
    <div style={{ backgroundColor: "#160016" }}>
      <ResumeSubmission />
      <div style={{marginLeft:"3vw", textAlign:"left"}}>
      <br />
      <br />
      <br />
      </div>
      <Steps num={1}/>
      <br />
      <br />
      <Guideline />
      
    </div>
  );
}
