import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom'; // Change this line

export default function SubmissionGuideline(){
    const navigate = useNavigate(); // Add this line

    const handleNextStep = () => { // Rename the function
        navigate('/submit/submissioninfo'); // Use navigate instead of Redirect
    };

    return(
        <div>
        <div style={{textAlign:"left", width:"35vw", margin:"auto", color:"white"}}>
            <h3 style={{color:"#fda400"}}><strong>Submission Guideline</strong></h3>
            <br />
            <p style={{fontSize:"18px"}}><h5 style={{color:"#fda400"}}><strong>Originality:</strong></h5> Submitted films should be original works created by the filmmaker or have appropriate rights and permissions. Plagiarism or copyright infringement is strictly prohibited.</p>
            <p style={{fontSize:"18px"}}><h5 style={{color:"#fda400"}}><strong>Rights and Permissions:</strong></h5> By submitting your film, you affirm that you own the necessary rights to distribute the film and its associated visuals and audio. You also grant permission to showcase the film during the event and any related promotional activities.</p>
            <p style={{fontSize:"18px"}}><h5 style={{color:"#fda400"}}><strong>Promotion and Publicity:</strong></h5> If your film is selected, you agree to allow us to use excerpts or still images & video from your film for promotional purposes on our website, social media platforms, and other related marketing materials.</p>
            <p style={{fontSize:"18px"}}><h5 style={{color:"#fda400"}}><strong>Notifications:</strong></h5>After the selection process, we will notify filmmakers regarding the status of their film. If selected, additional information and instructions will be provided.</p>
            <br />
            <hr style={{ width: "100%", color: "#654265", backgroundColor: "#654265", height:"1px" }} />
            <br />

            <p style={{color:"white", fontSize:"18px"}}><strong>Technical Requirement Checklist</strong></p>

            <div style={{width:"100", border:"1px solid #654265", padding:"4%", backgroundColor:"#2a082a", fontSize:"18px"}}>
            <p ><h5 style={{color:"#fda400"}}><strong>Video Format</strong></h5> Accepted video formats include MP4, AVI, MOV, and MKV.</p>
            <p><h5 style={{color:"#fda400"}}><strong>Resolution</strong></h5> Provide the highest resolution available for your film. We recommend at least 1080p (1920x1080 pixels), but higher resolutions are welcome.</p>
            <p><h5 style={{color:"#fda400"}}><strong>Aspect Ratio</strong></h5> Films should be submitted in either 16:9 (horizontal) or 9:16 (vertical) aspect ratio. Please ensure your film is properly formatted for one of these ratios.</p>
            <p><h5 style={{color:"#fda400"}}><strong>Frame Rate</strong></h5>Preferred frame rates are 24, 25, or 30 frames per second (fps).</p>
            <p><h5 style={{color:"#fda400"}}><strong>Cover Art</strong></h5>Along with your film submission, please include cover art for promotional purposes. The cover art should be provided in both horizontal (e.g., 1920x1080 pixels) and vertical (e.g., 1080x1920 pixels) formats. The cover art should represent your film and capture its essence. If you need one created, you can request a commission to be completed by a Fylm TV partner.</p>
            </div>
            <br />
            <p style={{color:"#a5a5a5", fontSize:"18px"}}>It's important to know that these guidelines are only suggestions, and you can tailor them to your specific requirements and preferences and an independent film even organizer.</p>
            
            
        </div>
        <div style={{ width:"50vw",margin:"auto", textAlign:"center" }}>
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
                border:"none"
              }}
              onClick={handleNextStep}
            >
              <strong>NEXT STEP</strong>
            </button>
            </div>
            <br />
            <br />
            <hr style={{ width: "100%", color: "#654265", backgroundColor: "#654265", height:"1px" }} />
        </div>
    )
}