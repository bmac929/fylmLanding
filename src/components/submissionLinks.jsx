import React, { useState } from "react";
import { MDBCheckbox, MDBInput,MDBDropdown, MDBDropdownMenu,MDBDropdownToggle, MDBRow, MDBCol,MDBTextArea,MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'; 
import SaveAndExit from './SaveAndExit';
import { saveStepProgress, loadSubmissionProgress } from '../utils/submissionStorage';

export default function SubmissionLinks({ onNextStep }){
    const navigate = useNavigate();
      const storedValue = localStorage.getItem('title');

      const [vlink, setVlink] = useState('');
      const [vpassword, setVpassword] = useState('');
      const [tlink, setTlink] = useState('');
      const [tpassword, setTpassword] = useState('');
      const [slink, setSlink] = useState('');
      const [spassword, setSpassword] = useState('');
      const [art, setArt] = useState('');

      // Load saved data on component mount
      React.useEffect(() => {
        // First try to load from submission storage system
        try {
          const savedProgress = loadSubmissionProgress();
          
          if (savedProgress.hasProgress) {
            const data = savedProgress.data;
            if (data.vlink) setVlink(data.vlink);
            if (data.vpassword) setVpassword(data.vpassword);
            if (data.tlink) setTlink(data.tlink);
            if (data.tpassword) setTpassword(data.tpassword);
            if (data.slink) setSlink(data.slink);
            if (data.spassword) setSpassword(data.spassword);
            if (data.art) setArt(data.art);
            return; // Exit early if we loaded from storage system
          }
        } catch (error) {
          console.log('Error loading from storage system:', error);
        }
        
        // Fallback to localStorage
        const savedVlink = localStorage.getItem('vlink');
        const savedVpassword = localStorage.getItem('vpassword');
        const savedTlink = localStorage.getItem('tlink');
        const savedTpassword = localStorage.getItem('tpassword');
        const savedSlink = localStorage.getItem('slink');
        const savedSpassword = localStorage.getItem('spassword');
        const savedArt = localStorage.getItem('art');
        
        if (savedVlink) setVlink(savedVlink);
        if (savedVpassword) setVpassword(savedVpassword);
        if (savedTlink) setTlink(savedTlink);
        if (savedTpassword) setTpassword(savedTpassword);
        if (savedSlink) setSlink(savedSlink);
        if (savedSpassword) setSpassword(savedSpassword);
        if (savedArt) setArt(savedArt);
      }, []);

      const handleSubmit = (event) =>{
        event.preventDefault();
        localStorage.setItem('vlink', vlink);
        localStorage.setItem('vpassword', vpassword);
        localStorage.setItem('tlink', tlink);
        localStorage.setItem('tpassword', tpassword);
        localStorage.setItem('slink', slink);
        localStorage.setItem('spassword', spassword);
        localStorage.setItem('art', art);
        
        // Call the validation function from parent component
        if (onNextStep) {
          onNextStep();
        } else {
          // Fallback to original navigation if no validation function provided
          navigate('/submit/submissionproduction');
        }
      }
      
      const handleVlink = (event) =>{
        setVlink(event.target.value);
      }

      const handleVpassword = (event) =>{
        setVpassword(event.target.value);
      }

      const handleTlink = (event) =>{
        setTlink(event.target.value);
      }

      const handleTpassword = (event) =>{
        setTpassword(event.target.value);
      }

      const handleSlink = (event) =>{
        setSlink(event.target.value);
      } 

      const handleSpassword = (event) =>{
        setSpassword(event.target.value);
      }

      const handleArt = (event) =>{
        setArt(event.target.value);
      }

      const handleBack = () =>{
        navigate('/submit/submissioninfo');
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
          vlink: vlink,
          vpassword: vpassword,
          tlink: tlink,
          tpassword: tpassword,
          slink: slink,
          spassword: spassword,
          art: art,
          payment: localStorage.getItem('payment') || '',
          cast: localStorage.getItem('cast') ? JSON.parse(localStorage.getItem('cast')) : [],
          awards: localStorage.getItem('awardTitle') || ''
        };
      };

      const handleSave = () => {
        // Save current step progress
        saveStepProgress(getCurrentData(), 3);
      };

    return(
        <div style={{textAlign:"left", width:"35vw", margin:"auto"}}>
             <p style={{fontSize:"18px"}}><h3 style={{color:"#fda400"}}><strong>Video Link Submission</strong></h3></p>

        <p style={{fontSize:"14px", color:"white", marginBottom:"-.2%"}}>Link<span style={{color:"red"}}>&nbsp;*</span></p>
        <MDBInput  required id='vlink' type='text' placeholder="Link" value={vlink} onChange={handleVlink} style={{backgroundColor:"#160016", color:"#fda400", paddingTop:"2%", paddingBottom:"2%"}}/>
        <br />
        <p style={{fontSize:"14px", color:"white", marginBottom:"-.2%"}}>Link Password (if applicable)</p>
        <MDBInput  required id='vpassword' type='text' placeholder="Password" value={vpassword} onChange={handleVpassword} style={{backgroundColor:"#160016", color:"#fda400", paddingTop:"2%", paddingBottom:"2%"}}/>
        <br />
        <hr style={{ width: "35vw", color: "#654265", backgroundColor: "#654265", height:"1px", margin:"auto" }} />
        <br />
        
        <p style={{fontSize:"18px",color:"#fda400"}}><strong>Trailer</strong></p>

        <p style={{fontSize:"14px", color:"white", marginBottom:"-.2%"}}>Please enter the link to your trailer.</p>
        <MDBInput  required id='tlink' type='text' placeholder="Link" value={tlink} onChange={handleTlink} style={{backgroundColor:"#160016", color:"#fda400", paddingTop:"2%", paddingBottom:"2%"}}/>
        <br />
        <p style={{fontSize:"14px", color:"white", marginBottom:"-.2%"}}>Link Password (if applicable)</p>
        <MDBInput  required id='tpassword' type='text' placeholder="Password" value={tpassword} onChange={handleTpassword} style={{backgroundColor:"#160016", color:"#fda400", paddingTop:"2%", paddingBottom:"2%"}}/>

        <br />
        <hr style={{ width: "35vw", color: "#654265", backgroundColor: "#654265", height:"1px", margin:"auto" }} />
        <br />

        <p style={{fontSize:"18px",color:"#fda400"}}><strong>Subtitles and dubs</strong></p>

        <p style={{fontSize:"14px", color:"white", marginBottom:"-.2%"}}>Don't have transcription(s)? Boost accessibility with our transcript service -- add transcripts or subtitles to your film effortlessly here. </p>

        <br />

        <p style={{fontSize:"14px", color:"white", marginBottom:"-.2%"}}>Please enter the link to your subtitles or dubs. (if applicable)</p>
        <MDBInput  required id='slink' type='text' placeholder="Subtitles" value={slink} onChange={handleSlink} style={{backgroundColor:"#160016", color:"#fda400", paddingTop:"2%", paddingBottom:"2%"}}/>
        <br />
        <p style={{fontSize:"14px", color:"white", marginBottom:"-.2%"}}>Link Password (if applicable)</p>
        <MDBInput  required id='spassword' type='text' placeholder="Password" value={spassword} onChange={handleSpassword} style={{backgroundColor:"#160016", color:"#fda400", paddingTop:"2%", paddingBottom:"2%"}}/>

        <br />
             <p style={{fontSize:"18px"}}><h3 style={{color:"#fda400"}}><strong>Cover Art Submission</strong></h3></p>
             <p style={{fontSize:"14px", color:"white", marginBottom:"-.2%"}}>For optimal display, please submit cover art in the following sizes: <br />
             Horizontal orientation: A x B pixels or 16:9 aspect ratio (No more than X mb)  <br />
             Vertical orientation: A x B pixels or 9:16 aspect ratio (No more than X mb)           </p>

            <br />

                <p style={{fontSize:"14px", color:"white", marginBottom:"-.2%"}}>Link</p>
        <MDBInput  required id='art' type='text' placeholder="Cover Art" value={art} onChange={handleArt} style={{backgroundColor:"#160016", color:"#fda400", paddingTop:"2%", paddingBottom:"2%"}}/>

            <br />
            <p style={{fontSize:"14px", color:"white", marginBottom:"-.2%"}}>No cover art? We offer professionally designed, custom work for you through our network of providers here.</p>
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
              currentStep={3} 
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
              onClick={handleSubmit}
            >
              <strong>NEXT STEP</strong>
            </button>
          </MDBCol>
          </div>
        </div>
    )
}