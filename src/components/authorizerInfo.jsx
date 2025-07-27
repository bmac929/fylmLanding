import React, { useState, useEffect } from "react";
import { MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

export default function AuthorizerInfo(){
    const [ userName, setUserName] = useState(true);
    const [submitter, setSubmitter] = useState(() => {
        // Initialize from localStorage if available
        return localStorage.getItem('submitter') || '';
    });

    // Update localStorage whenever submitter changes
    useEffect(() => {
        localStorage.setItem('submitter', submitter);
    }, [submitter]);

        return(
            <div>
                <div style={{textAlign:"left", width:"35vw", margin:"auto", color:"white"}}>
                <p style={{fontSize:"18px"}}><h3 style={{color:"#fda400"}}><strong>Authorizer Information<span style={{color:"red"}}>&nbsp;*</span></strong></h3> Please provide accurate contact information. We may need to reach out to you for further information or notifications regarding your film.</p>
                <MDBInput  id='form1' type='text' placeholder="Please enter your email" value={submitter} style={{backgroundColor:"#160016", color:"#fda400"}} onChange={(e) => setSubmitter(e.target.value)}/>
                <div style={{display:"Inline-block",width:"35vw", margin:"auto", position:"relative"}}>
                   
                </div>
                </div>
            </div>
        )}
        
        

