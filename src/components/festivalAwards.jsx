import React from "react";
import {  MDBInput, MDBBtn, MDBIcon, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import SaveAndExit from './SaveAndExit';
import { saveStepProgress } from '../utils/submissionStorage';





export default function FestivalAwards(){
    const navigate = useNavigate();
    
    const handleBack = () =>{
      navigate('/submit/submissionlinks');
    }

    // Prepare current data for Save & Exit
    const getCurrentData = () => {
      return {
        title: localStorage.getItem('title') || '',
        year: localStorage.getItem('year') || '',
        duration: localStorage.getItem('duration') || '',
        description: localStorage.getItem('description') || '',
        rating: localStorage.getItem('rating') || '',
        genre: localStorage.getItem('genre') || '',
        warning: localStorage.getItem('warning') || '',
        submitter: localStorage.getItem('submitter') || '',
        vlink: localStorage.getItem('vlink') || '',
        vpassword: localStorage.getItem('vpassword') || '',
        tlink: localStorage.getItem('tlink') || '',
        tpassword: localStorage.getItem('tpassword') || '',
        slink: localStorage.getItem('slink') || '',
        spassword: localStorage.getItem('spassword') || '',
        art: localStorage.getItem('art') || '',
        payment: localStorage.getItem('payment') || '',
        cast: localStorage.getItem('cast') ? JSON.parse(localStorage.getItem('cast')) : [],
        awards: localStorage.getItem('awardTitle') || ''
      };
    };

    const handleSave = () => {
      // Save current step progress
      saveStepProgress(getCurrentData(), 4);
    };
    
    return (
      <div style={{ textAlign: "left", width: "35vw", margin: "auto" }}>
        <p style={{ fontSize: "18px" }}>
          <h3 style={{ color: "#fda400" }}>
            <strong>Festival Awards</strong>
          </h3>
        </p>

        <p style={{ fontSize: "14px", color: "white", marginBottom: "-.2%" }}>
          Award Title
        </p>
        <MDBInput
          id="awardTitle"
          type="text"
          placeholder="Award Title"
          onChange={(e) => localStorage.setItem("awardTitle", e.target.value)}
          style={{
            backgroundColor: "#160016",
            paddingTop: "2%",
            paddingBottom: "2%",
            color: "#fda400"
          }}
        />
        <br />
        <p style={{ fontSize: "14px", color: "white", marginBottom: "-.2%" }}>
          Year
        </p>
        <MDBInput
          required
          id="awardYear"
          type="text"
          placeholder="Year"
          onChange={(e) => localStorage.setItem("awardYear", e.target.value)}
          style={{
            backgroundColor: "#160016",
            paddingTop: "2%",
            paddingBottom: "2%",
            color: "#fda400"
          }}
        />

        <br />
        <MDBBtn
          color="tertiary"
          style={{
            color: "#fda400",
            paddingTop: "5px",
            paddingBottom: "5px",
            paddingRight: "15px",
            paddingLeft: "0px",
          }}
        >
          <MDBIcon fas icon="plus-circle" /> Add another award
        </MDBBtn>

        <br />

        <hr
          style={{
            width: "100",
            color: "#654265",
            backgroundColor: "#654265",
            height: "1px",
            margin: "auto",
          }}
        />

        <br />

        <p style={{ fontSize: "18px" }}>
          <h3 style={{ color: "#fda400" }}>
            <strong>Other Links</strong>
          </h3>
        </p>

        <p style={{ fontSize: "14px", color: "white", marginBottom: "-.2%" }}>
          Please link the film's IMDB page
        </p>
        <MDBInput
          required
          id="imdbLink"
          type="text"
          placeholder="Title"
          onChange={(e) => localStorage.setItem("imdbLink", e.target.value)}
          style={{
            backgroundColor: "#160016",
            paddingTop: "2%",
            paddingBottom: "2%",
            color: "#fda400"
          }}
        />
        <br />
        <br />
        <br />
        <div style={{marginLeft:"0px", display:"inline-block", width:"100%"}}>
            <MDBCol size={1} style={{paddingLeft:"0px", display:"inline-block"}}>
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
              onClick={handleBack}
            >
              <strong>BACK</strong>
            </button>
          </MDBCol>
          <MDBCol size={6} style={{display:"inline-block"}}></MDBCol>

          <MDBCol size={5} style={{ display:"inline-block", textAlign:"right"}}>
            <SaveAndExit 
              currentStep={4} 
              currentData={getCurrentData()} 
              onSave={handleSave}
            />
            <button
              color="tertiary"
              size="sm"
              style={{
                color: "#2a082a",
                backgroundColor: "#fda400",
                borderRadius: "5px",
                paddingLeft: "25px",
                paddingRight: "25px",
                height:"3.5vh",
                marginTop:".5vh",
                fontSize:"10px", 
                border:"none",
                display:"inline-block",
                marginLeft:"1vw",
                
              }}
              onClick={() => navigate('/submit/paymentoptions')}
            >
              <strong>NEXT STEP</strong>
            </button>
          </MDBCol>
          </div>
      </div>
    );
}