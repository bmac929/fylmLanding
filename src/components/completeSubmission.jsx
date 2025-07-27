import React from "react";
import {
    MDBCheckbox,
    MDBRow,
    MDBCol,
    MDBBtn
  } from "mdb-react-ui-kit";
  import Pic from "../images/submissionComplete.png";
  import { useNavigate } from "react-router-dom";

  export default function CompleteSubmission(){
    const navigate = useNavigate();
    return (
      <div>
        <MDBRow>
          <MDBCol size={6}>
            <img src={Pic} />
          </MDBCol>
          <MDBCol size={6} style={{ textAlign: "left", marginTop: "25vh" }}>
            <h3 style={{ color: "#fda400" }}>
              <strong>Hooray! Your submission has been received.</strong>
            </h3>
            <br />
            <p style={{ color: "white", fontSize: "18px" }}>
              Fylm TV will review your submission details. Please allow 15-30
              days of processing time. <br />
              We may reach out to you via email for any questions or necessary
              negotiations.
            </p>
            <button
              color="tertiary"
              size="sm"
              style={{
                color: "#fda400",
                backgroundColor: "transparent",
                borderRadius: "5px",
                paddingLeft: "25px",
                paddingRight: "25px",
                height:"3.5vh",
                marginTop:".5vh",
                fontSize:"10px", 
                border:"1px solid",
                display:"inline-block"
              }}
              onClick={() => navigate('/')}
            >
              <strong>HOME</strong>
            </button>
            
          </MDBCol>
        </MDBRow>
      </div>
    );
  }