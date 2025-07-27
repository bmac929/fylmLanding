import React, {useState} from "react";
import { MDBCheckbox, MDBInput,MDBDropdown, MDBDropdownMenu,MDBDropdownToggle, MDBRow, MDBCol,MDBTextArea,MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'; 
import SaveAndExit from './SaveAndExit';
import { saveStepProgress } from '../utils/submissionStorage';

export default function SubmissionInfo({ onNextStep }){
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [duration, setDuration] = useState('');
    const [genres, setGenres] = useState([]);
    const [warning, setWarning] = useState('None');
    const [dataLoaded, setDataLoaded] = useState(false);

    // Load saved data on component mount
    React.useEffect(() => {
        const savedTitle = localStorage.getItem('title');
        const savedYear = localStorage.getItem('year');
        const savedDescription = localStorage.getItem('description');
        const savedRating = localStorage.getItem('rating');
        const savedDuration = localStorage.getItem('duration');
        const savedGenre = localStorage.getItem('genre');
        const savedWarning = localStorage.getItem('warning');
        
        if (savedTitle) setTitle(savedTitle);
        if (savedYear) setYear(savedYear);
        if (savedDescription) setDescription(savedDescription);
        if (savedRating) setRating(savedRating);
        if (savedDuration) setDuration(savedDuration);
        if (savedGenre) setGenres(savedGenre.split(', ').filter(g => g));
        if (savedWarning) setWarning(savedWarning);
        
        setDataLoaded(true);
    }, []);

    const handleSubmit = (event) =>{
      event.preventDefault();
      localStorage.setItem('title', title);
      localStorage.setItem('year', year);
      localStorage.setItem('duration', duration);
      localStorage.setItem('description', description);
      localStorage.setItem('rating', rating);
      localStorage.setItem('genre', genres.join(', '));
      localStorage.setItem('warning', warning);
      console.log(genres);
      
      // Call the validation function from parent component
      if (onNextStep) {
        onNextStep();
      } else {
        // Fallback to original navigation if no validation function provided
        navigate('/submit/submissionlinks');
      }
    }

    const handleTitle = (event) =>{
      setTitle(event.target.value);
    }

    const handleYear = (event) =>{
      setYear(event.target.value);
    }

    const handleDuration = (event) =>{
      setDuration(event.target.value);
    }
    
    const handleDesc = (event) =>{
      setDescription(event.target.value);
    }

    const handleRating = (event) =>{
      setRating(event.target.value);
    }

    const handleWarn = (event) =>{
      setWarning(event.target.value);
    }

    const handleGenreChange = (event) => {
      const { value, checked } = event.target;
      if (checked) {
        setGenres([...genres, value]);
        
      } else {
        setGenres(genres.filter(genre => genre !== value));
        
      }
    };

    const handleBack = () => { // Rename the function
      navigate('/submit/submission'); // Use navigate instead of Redirect
  };

    const getCurrentData = () => {
      return {
        title: title || '',
        year: year || '',
        duration: duration || '',
        description: description || '',
        rating: rating || '',
        genre: genres.length > 0 ? genres.join(', ') : '',
        warning: warning || 'None',
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
      saveStepProgress(getCurrentData(), 2);
    };

    return(
        <div style={{textAlign:"left", width:"35vw", margin:"auto"}}>
            

            <p style={{fontSize:"18px"}}><h3 style={{color:"#fda400"}}><strong>Submission Info</strong></h3></p>

            <p style={{fontSize:"18px", color:"white", marginBottom:"-.5%"}}>What is the title<span style={{color:"red"}}>&nbsp;*</span></p>
            <MDBInput  required id='form1' type='text' placeholder="Title" value={title} onChange={handleTitle} style={{backgroundColor:"#160016", color:"#fda400", paddingTop:"2%", paddingBottom:"2%"}}/>
            <br />

            <div style={{display:"inline-block", justifyContent:"space-between", width:"100%"}}>
            <MDBCol size={6} style={{paddingLeft:"0px", display:"inline-block"}}>
            <p style={{fontSize:"18px", color:"white", marginBottom:"-.5%"}}>Year of production<span style={{color:"red"}}>&nbsp;*</span></p>
            <MDBInput required id='form1' type='text' placeholder="Year" value={year} onChange={handleYear} style={{backgroundColor:"#160016", color:"#fda400", paddingTop:"2%", paddingBottom:"2%", width:"100%",display:"inline-block"}}/>
            </MDBCol>

            <MDBCol size={2} style={{paddingLeft:"0px", display:"inline-block"}}>
            <p style={{fontSize:"18px", color:"white", marginBottom:"-.5%"}}>Duration<span style={{color:"red"}}>&nbsp;*</span></p>
            <MDBInput required id='form1' type='text' placeholder="Minutes" value={duration} onChange={handleDuration} style={{backgroundColor:"#160016", color:"#fda400", paddingTop:"2%", paddingBottom:"2%", width:"100%",display:"inline-block"}}/>
           
            </MDBCol>
            </div>
            <br />
            <br />

            <p style={{fontSize:"18px", color:"white", marginBottom:"-.5%"}}>Description<span style={{color:"red"}}>&nbsp;*</span></p>
            <MDBTextArea style={{backgroundColor:"#160016", color:"#fda400"}} id='filmDescription' value={description} onChange={handleDesc} rows={4} />
            
            
    <br />
    <hr style={{ width: "35vw", color: "#654265", backgroundColor: "#654265", height:"1px", margin:"auto" }} />
    <br />
    <p style={{fontSize:"20px", color:"white"}}><h3 style={{color:"#fda400"}}><strong>Submission Details</strong></h3><strong>Please provide the details of this film or series.</strong> </p>

    <p style={{fontSize:"18px", color:"white", marginBottom:"-.5%"}}>Genre (Select all that apply)<span style={{color:"red"}}>&nbsp;*</span></p>
    <br />
        <div style={{width:"35vw", margin:"auto", alignContent:"center"}}>
        <MDBRow style={{color:"white",width:"100", margin:"auto", alignContent:"center"}}>
            <MDBCol size={6}>
                <MDBCheckbox value='Horror' label="Horror" onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Comedy' label="Comedy" onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Crime' label='Crime' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Education' label='Education' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Science' label='Science' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Documentary' label='Documentary' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='History' label='History' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Thriller' label='Thriller' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Sci-Fi' label='Sci-Fi' onChange={handleGenreChange}/>
                <br/>
            </MDBCol>
                
            <MDBCol size={5}>
               <MDBCheckbox value='Kids & Family' label='Kids & Family' onChange={handleGenreChange}/>
               <br/>
                <MDBCheckbox value='Musical' label='Musical' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Romance' label='Romance' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Drama' label='Drama' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Animation' label='Animation' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Action' label='Action' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Adventure' label='Adventure' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Mystery' label='Mystery' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Other' label='Other' onChange={handleGenreChange}/>
                <br/>
                
            </MDBCol>

            <MDBCol size={1}>
                <MDBCheckbox value='Foreign' label='Foreign' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Reality' label='Reality' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Sports' label='Sports' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Holiday' label='Holiday' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='War' label='War' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Western' label='Western' onChange={handleGenreChange}/>
                <br/>
                <MDBCheckbox value='Fantasy' label='Fantasy' onChange={handleGenreChange}/>
                <br/>
            </MDBCol>
        </MDBRow>
        </div>

        <br />

        <p style={{fontSize:"18px", color:"white", marginBottom:"-.2%"}}>Parental Rating<span style={{color:"red"}}>&nbsp;*</span></p>
            <MDBInput required id='form1' type='text' placeholder="PG" value={rating} onChange={handleRating} style={{backgroundColor:"#160016", color:"#fda400", paddingTop:"2%", paddingBottom:"2%", width:"20%",display:"inline-block"}}/>

        <br />

        <p style={{fontSize:"18px", color:"white", marginBottom:"-.2%"}}>Viewer Warnings<span style={{color:"red"}}>&nbsp;*</span></p>
            <MDBInput required id='form1' type='text' placeholder="Warning" value={warning} onChange={handleWarn} style={{backgroundColor:"#160016", color:"#fda400", paddingTop:"2%", paddingBottom:"2%", width:"100%",display:"inline-block"}}/>

            <br />
            <div style={{width:"35vw", margin:"auto"}}>
            
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
            {dataLoaded && (
              <SaveAndExit 
                currentStep={2} 
                currentData={getCurrentData()} 
                onSave={handleSave}
              />
            )}
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
        </div>
    )
}