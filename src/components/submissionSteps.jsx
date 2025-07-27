import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";

export default function SubmissionSteps({num}) {
  return (
    <div>
      <div
        style={{ display: "inline-block", color: "#654265", fontSize: "14dfpx", width: "100%", margin:'auto', textAlign:'center' }}
      >
        <div style={{ display: "inline-block", marginRight: "5vw", color: (num>=1)?"#fda400":"#654265"}}>
          <MDBIcon fas icon="check" /> &nbsp;<strong>Submission Guideline</strong>
        </div>

        <div style={{ display: "inline-block", marginRight: "5vw", color: (num>=2)?"#fda400":"#654265" }}>
          <MDBIcon fas icon="check"/> &nbsp;<strong>Basic Info</strong>
        </div>

        <div style={{ display: "inline-block", marginRight: "5vw", color: (num>=3)?"#fda400":"#654265" }}>
          <MDBIcon fas icon="check"/> &nbsp;<strong>Submission Details</strong>
        </div>

        <div style={{ display: "inline-block", marginRight: "5vw", color: (num>=4)?"#fda400":"#654265" }}>
          <MDBIcon fas icon="check"/> &nbsp;<strong>Production Details</strong>
        </div>

        <div style={{ display: "inline-block", marginRight: "5vw", color: (num==5)?"#fda400":"#654265" }}>
          <MDBIcon fas icon="check"/> &nbsp;<strong>Payment Options</strong>
        </div>
        <br />
      </div>
      <div>
      <hr style={{ width: "100%", color: "#654265", backgroundColor: "#654265", height:"1px" }} />
      </div>
    </div>
  );
}
