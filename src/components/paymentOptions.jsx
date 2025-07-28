import React, { useState } from 'react';
import {
    MDBCheckbox,
    MDBRow,
    MDBCol,
    MDBBtn
  } from "mdb-react-ui-kit";
import {v4} from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import SaveAndExit from './SaveAndExit';
import { saveStepProgress, clearSubmissionProgress } from '../utils/submissionStorage';

export default function PaymentOptions({ onNextStep }){
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load saved payment option on component mount
  React.useEffect(() => {
    const savedPayment = localStorage.getItem('payment');
    if (savedPayment) {
      setSelectedPayment(savedPayment);
    }
  }, []);

  const handleBack = () =>{
    navigate('/submit/submissionproduction');
  }
  
  const handleSubmit = async (event) =>{  
    event.preventDefault();
    
    // Call the validation function from parent component
    if (onNextStep && !onNextStep()) {
      // If validation fails, stop here
      return;
    }

    // Check if reCAPTCHA token is available (temporarily disabled for testing)
    // if (!recaptchaToken) {
    //   alert("Please complete the reCAPTCHA verification");
    //   return;
    // }

    setIsSubmitting(true);
    
    const title = localStorage.getItem('title');
    const year = localStorage.getItem('year');  
    const duration = localStorage.getItem('duration');
    const description = localStorage.getItem('description');
    const rating = localStorage.getItem('rating');
    const genre = localStorage.getItem('genre');
    const warning = localStorage.getItem('warning');
    const vlink = localStorage.getItem('vlink');
    const vpassword = localStorage.getItem('vpassword');
    const tlink = localStorage.getItem('tlink');
    const tpassword = localStorage.getItem('tpassword');
    const slink = localStorage.getItem('slink');
    const spassword = localStorage.getItem('spassword');
    const art = localStorage.getItem('art');
    const payment = localStorage.getItem('payment');
    const submitter = localStorage.getItem('submitter');
    const awards = localStorage.getItem('awardTitle');
    const cast = localStorage.getItem('cast');
    const id = v4();

    let film = {
      title: title,
      productionYear: year,
      duration: duration,
      description: description,
      rating: rating,
      genre: genre,
      warning: warning,
      link: vlink,
      linkPassword: vpassword,
      trailer: tlink,
      trailerPassword: tpassword,
      subtitles: slink,
      subtitlesPassword: spassword,
      art: art,
      payment: payment,
      id: id,
      submitter: submitter,
      awards: awards,
      cast: cast ? JSON.parse(cast) : [],
      recaptchaToken: recaptchaToken
    }

    console.log(film);
    try{
      const response = await axios.post(`${process.env.VITE_API_BASE_URL}/film`, film);
      console.log('Submission successful:', response.data);
      navigate('/submit/submissioncomplete');
  
      // Clear all submission data after successful submission
      clearSubmissionProgress();
      localStorage.clear();
    }catch(err){
      console.log('Submission error:', err);
      alert("There was an error submitting your film. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  

  const handlePaymentChange = (paymentType) => {
    setSelectedPayment(paymentType);
    localStorage.setItem('payment', paymentType);
  };

  const handleRecaptchaVerify = (token) => {
    setRecaptchaToken(token);
  };

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
      payment: selectedPayment,
      cast: localStorage.getItem('cast') ? JSON.parse(localStorage.getItem('cast')) : [],
      awards: localStorage.getItem('awardTitle') || ''
    };
  };

  const handleSave = () => {
    // Save current step progress
    saveStepProgress(getCurrentData(), 5);
  };

    return (
      <>
        <div style={{ textAlign: "left", width: "35vw", margin: "auto" }}>
          <p style={{ fontSize: "18px" }}>
            <h3 style={{ color: "#fda400" }}>
              <strong>Payment Options<span style={{color:"red"}}>&nbsp;*</span></strong>
            </h3>
          </p>
          <br />
          <p style={{ fontSize: "12px", color: "white" }}>
          Please select the payment option(s) you're aiming for. This helps us understand your goals, but note that final terms will be determined during the review process and may differ depending on the film's fit and performance potential.
          </p>
          <br />
          <div
            style={{
              backgroundColor: "#2a082a",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <p>
              <MDBCheckbox 
                style={{ marginLeft: "4px" }}
                checked={selectedPayment === 'Ad Revenue Split'}
                onChange={() => handlePaymentChange('Ad Revenue Split')}
              />
              <h5 style={{ color: "white" }}>
                <strong> &nbsp; &nbsp; &nbsp;Ad Revenue Split</strong>
              </h5>{" "}
              The preferred choice for most films on Fylm TV, the Ad Revenue Split
              structure offers submitters the chance to negotiate terms, including
              the revenue split percentage. This choice allows flexibility to
              filmmakers at any stage of their career.{" "}
            </p>
          </div>
            <br />
          <div
            style={{
              backgroundColor: "#2a082a",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <p>
              <MDBCheckbox 
                style={{ marginLeft: "4px" }}
                checked={selectedPayment === 'Paid Upfront'}
                onChange={() => handlePaymentChange('Paid Upfront')}
              />
              <h5 style={{ color: "white" }}>
                <strong> &nbsp; &nbsp; &nbsp;Paid Upfront</strong>
              </h5>{" "}
              The preferred choice for most films on Fylm TV, the Ad Revenue Split
              structure offers submitters the chance to negotiate terms, including
              the revenue split percentage. This choice allows flexibility to
              filmmakers at any stage of their career.{" "}
            </p>
          </div>
            <br />
          <div
            style={{
              backgroundColor: "#2a082a",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <p>
              <MDBCheckbox 
                style={{ marginLeft: "4px" }}
                checked={selectedPayment === 'Non-paid Option'}
                onChange={() => handlePaymentChange('Non-paid Option')}
              />
              <h5 style={{ color: "white" }}>
                <strong> &nbsp; &nbsp; &nbsp;Non-paid Option</strong>
              </h5>{" "}
              The preferred choice for most films on Fylm TV, the Ad Revenue Split
              structure offers submitters the chance to negotiate terms, including
              the revenue split percentage. This choice allows flexibility to
              filmmakers at any stage of their career.{" "}
            </p>
          </div>
            <br />
          <div
            style={{
              backgroundColor: "#2a082a",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <p>
              <MDBCheckbox 
                style={{ marginLeft: "4px" }}
                checked={selectedPayment === 'Film Competition'}
                onChange={() => handlePaymentChange('Film Competition')}
              />
              <h5 style={{ color: "white" }}>
                <strong> &nbsp; &nbsp; &nbsp;Film Competition</strong>
              </h5>{" "}
              The preferred choice for most films on Fylm TV, the Ad Revenue Split
              structure offers submitters the chance to negotiate terms, including
              the revenue split percentage. This choice allows flexibility to
              filmmakers at any stage of their career.{" "}
            </p>
          </div>
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
                currentStep={5} 
                currentData={getCurrentData()} 
                onSave={handleSave}
              />
              <button
                color="tertiary"
                size="sm"
                disabled={isSubmitting}
                style={{
                  color: "#2a082a",
                  backgroundColor: isSubmitting ? "#cccccc" : "#fda400",
                  borderRadius: "5px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  height:"3.5vh",
                  marginTop:".5vh",
                  fontSize:"10px", 
                  border:"none",
                  display:"inline-block",
                  marginLeft:"1vw",
                  cursor: isSubmitting ? "not-allowed" : "pointer"
                }}
                onClick={handleSubmit}
              >
                <strong>{isSubmitting ? "SUBMITTING..." : "NEXT STEP"}</strong>
              </button>
            </MDBCol>
            </div>
        </div>
        
        {/* Google reCAPTCHA v3 - invisible */}
        <GoogleReCaptcha
          onVerify={handleRecaptchaVerify}
          siteKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeyaHIrAAAAADeYNDU7GHKCxCuNOviIq8I-ncF-"}
          action="submit_film"
        />
      </>
    );
}