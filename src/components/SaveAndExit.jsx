import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { saveSubmissionProgress, getSubmissionSummary } from '../utils/submissionStorage';

export default function SaveAndExit({ currentStep, currentData, onSave }) {
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Component mounted successfully
  }, [currentStep, currentData, onSave]);

  const handleSaveAndExit = () => {
    if (!currentData || !currentStep) {
      console.error('Missing required props:', { currentData, currentStep });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Save current progress
      const success = saveSubmissionProgress(currentData, currentStep);
      
      if (success) {
        setSaveSuccess(true);
        setTimeout(() => {
          setShowModal(false);
          setSaveSuccess(false);
          setIsSaving(false);
          navigate('/'); // Navigate to home page
        }, 2000);
      } else {
        throw new Error('Failed to save progress');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      setIsSaving(false);
    }
  };

  const handleSaveOnly = () => {
    if (!currentData || !currentStep) {
      console.error('Missing required props:', { currentData, currentStep });
      return;
    }
    
    setIsSaving(true);
    
    try {
      const success = saveSubmissionProgress(currentData, currentStep);
      
      if (success) {
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          setIsSaving(false);
        }, 2000);
        
        if (onSave) {
          onSave();
        }
      } else {
        throw new Error('Failed to save progress');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      setIsSaving(false);
    }
  };

  const getProgressSummary = () => {
    const summary = getSubmissionSummary();
    return {
      title: summary.title,
      progress: summary.progress,
      lastSaved: summary.lastSaved
    };
  };

  return (
    <>
      <button
        style={{
          color: "white",
          backgroundColor: "transparent",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingLeft: "15px",
          paddingRight: "15px",
          border: "none",
          borderRadius: "5px",
          marginRight: "10px",
          cursor: "pointer"
        }}
        onClick={() => {
          setShowModal(true);
        }}
      >
        Save & Exit
      </button>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: "#160016",
            color: "white",
            padding: "30px",
            borderRadius: "10px",
            maxWidth: "500px",
            width: "90%",
            border: "1px solid #654265"
          }}>
            {!saveSuccess ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ color: "#fda400", margin: 0 }}>Save Your Progress</h3>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#fda400',
                      fontSize: '24px',
                      cursor: 'pointer',
                      padding: '0'
                    }}
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>
                
                <p>Your submission progress will be saved so you can continue later.</p>
                
                <div style={{ 
                  backgroundColor: "#2a082a", 
                  padding: "15px", 
                  borderRadius: "5px", 
                  marginTop: "15px",
                  marginBottom: "20px"
                }}>
                  <h6 style={{ color: "#fda400", marginBottom: "10px" }}>Current Progress:</h6>
                  <p><strong>Title:</strong> {getProgressSummary().title}</p>
                  <p><strong>Progress:</strong> {getProgressSummary().progress}%</p>
                  <p><strong>Last Saved:</strong> {getProgressSummary().lastSaved}</p>
                </div>
                
                <div style={{ marginTop: "20px" }}>
                  <p style={{ fontSize: "14px", color: "#ccc" }}>
                    <strong>Note:</strong> Your progress is automatically saved every 30 seconds, 
                    but you can manually save and exit at any time.
                  </p>
                </div>
                
                <div style={{ marginTop: "25px", textAlign: "center" }}>
                  <button
                    style={{
                      color: "#fda400",
                      backgroundColor: "transparent",
                      border: "1px solid #fda400",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      marginRight: "10px",
                      cursor: "pointer"
                    }}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      color: "white",
                      backgroundColor: "#654265",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      marginRight: "10px",
                      cursor: "pointer"
                    }}
                    onClick={handleSaveOnly}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Only'}
                  </button>
                  <button
                    style={{
                      color: "white",
                      backgroundColor: "#fda400",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      cursor: "pointer"
                    }}
                    onClick={handleSaveAndExit}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save & Exit'}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ color: "#4CAF50", fontSize: "48px", marginBottom: "15px" }}>
                  ✓
                </div>
                <h5 style={{ color: "#4CAF50" }}>Progress Saved Successfully!</h5>
                <p>You can return to continue your submission anytime.</p>
                <button
                  style={{
                    color: "white",
                    backgroundColor: "#fda400",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    marginTop: "15px",
                    cursor: "pointer"
                  }}
                  onClick={() => setShowModal(false)}
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 