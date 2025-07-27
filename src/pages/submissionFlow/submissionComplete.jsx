import React from "react";
import Steps from "../../components/submissionSteps.jsx";
import Nav2 from "../../components/nav2.jsx";
import CompleteSubmission from '../../components/completeSubmission.jsx';

export default function SubmissionComplete() {
  return (
    <div style={{ backgroundColor: "#160016" }}>
      <div style={{marginLeft:"3vw", textAlign:"left", margin:"auto"}}>
      <br />
      <br />
      </div>
      <Steps num={5}/>
      <br />
      <br />
      <CompleteSubmission />
      <br />
      <br />
      <br />
      <br />
      <br />
        <hr style={{ width: "100", color: "#654265", backgroundColor: "#654265", height:"1px", margin:"auto" }} />
      
    </div>
  );
}