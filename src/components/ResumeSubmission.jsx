import React, { useState, useEffect } from 'react';
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { hasSubmissionProgress, getSubmissionSummary, getCurrentStep } from '../utils/submissionStorage';

export default function ResumeSubmission() {
  const [showModal, setShowModal] = useState(false);
  const [hasProgress, setHasProgress] = useState(false);
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved progress when component mounts
    const progress = hasSubmissionProgress();
    setHasProgress(progress);
    
    if (progress) {
      const progressSummary = getSubmissionSummary();
      setSummary(progressSummary);
      
      // Show modal after a short delay
      setTimeout(() => {
        setShowModal(true);
      }, 1000);
    }
  }, []);

  const handleResume = () => {
    const currentStep = getCurrentStep();
    
    // Navigate to the appropriate step
    switch (currentStep) {
      case 1:
        navigate('/submit/submission');
        break;
      case 2:
        navigate('/submit/submissioninfo');
        break;
      case 3:
        navigate('/submit/submissionlinks');
        break;
      case 4:
        navigate('/submit/submissionproduction');
        break;
      case 5:
        navigate('/submit/paymentoptions');
        break;
      default:
        navigate('/submit/submission');
    }
    
    setShowModal(false);
  };

  const handleStartNew = () => {
    // Clear any existing progress and start fresh
    localStorage.clear();
    setShowModal(false);
    setHasProgress(false);
  };

  if (!hasProgress) {
    return null;
  }

  return (
    <MDBModal show={showModal} setShow={setShowModal} tabIndex="-1" backdrop="static">
      <MDBModalDialog centered>
        <MDBModalContent style={{ backgroundColor: "#160016", color: "white" }}>
          <MDBModalHeader>
            <MDBModalTitle style={{ color: "#fda400" }}>
              <strong>Resume Your Submission</strong>
            </MDBModalTitle>
          </MDBModalHeader>
          
          <MDBModalBody>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ 
                fontSize: "48px", 
                color: "#fda400", 
                marginBottom: "15px" 
              }}>
                📝
              </div>
              <h5>You have a saved submission in progress!</h5>
            </div>
            
            {summary && (
              <div style={{ 
                backgroundColor: "#2a082a", 
                padding: "15px", 
                borderRadius: "5px", 
                marginBottom: "20px" 
              }}>
                <h6 style={{ color: "#fda400", marginBottom: "10px" }}>Submission Details:</h6>
                <p><strong>Title:</strong> {summary.title}</p>
                <p><strong>Progress:</strong> {summary.progress}%</p>
                <p><strong>Last Saved:</strong> {summary.lastSaved}</p>
                <p><strong>Current Step:</strong> {summary.currentStep} of 5</p>
              </div>
            )}
            
            <div style={{ marginTop: "20px" }}>
              <p style={{ fontSize: "14px", color: "#ccc" }}>
                <strong>Choose an option:</strong>
              </p>
              <ul style={{ fontSize: "14px", color: "#ccc", paddingLeft: "20px" }}>
                <li><strong>Resume:</strong> Continue from where you left off</li>
                <li><strong>Start New:</strong> Begin a fresh submission (this will clear your saved progress)</li>
              </ul>
            </div>
          </MDBModalBody>
          
          <MDBModalFooter>
            <MDBBtn
              color="tertiary"
              style={{
                color: "#fda400",
                backgroundColor: "transparent",
                border: "1px solid #fda400"
              }}
              onClick={handleStartNew}
            >
              Start New
            </MDBBtn>
            <MDBBtn
              color="tertiary"
              style={{
                color: "white",
                backgroundColor: "#fda400"
              }}
              onClick={handleResume}
            >
              Resume Submission
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
} 