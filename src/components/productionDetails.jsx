import React, { useState, useEffect } from "react";
import { MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

export default function ProductionDetails(){
    const [ userName, setUserName] = useState(true);
    const [members, setMembers] = useState([{ id: 1, name: '', email: '', role: '' }]);

    // Load members from localStorage on component mount
    useEffect(() => {
        const savedCast = localStorage.getItem('cast');
        if (savedCast) {
            try {
                const parsedCast = JSON.parse(savedCast);
                if (parsedCast.length > 0) {
                    setMembers(parsedCast);
                }
            } catch (error) {
                console.error('Error parsing saved cast data:', error);
            }
        }
    }, []);

    // Save members to localStorage whenever members state changes
    useEffect(() => {
        localStorage.setItem('cast', JSON.stringify(members));
    }, [members]);

    const addMember = () => {
        const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
        setMembers([...members, { id: newId, name: '', email: '', role: '' }]);
    };

    const removeMember = (id) => {
        if (members.length > 1) {
            setMembers(members.filter(member => member.id !== id));
        }
    };

    const updateMember = (id, field, value) => {
        setMembers(members.map(member => 
            member.id === id ? { ...member, [field]: value } : member
        ));
    };

      if(userName){
    return(
        <div>
            <div style={{textAlign:"left", width:"35vw", margin:"auto", color:"white"}}>
            <p style={{fontSize:"18px"}}><h3 style={{color:"#fda400"}}><strong>Production Details</strong></h3> Please provide full names, emails, and roles of of the members involved in this production. By submitting cast and crew information, you authorize FylmTV to verify it. You acknowledge that we will invite the submitted individuals to sign up on FylmTV for verification, future collaboration, and additional benefits.</p>
            
            {members.map((member, index) => (
                <div key={member.id} style={{display:"flex", width:"35vw", margin:"auto", gap:"10px", marginBottom:"10px" }}>
                    <MDBInput  
                        id={`name-${member.id}`} 
                        type='text' 
                        placeholder="Name" 
                        value={member.name}
                        onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                        style={{backgroundColor:"#160016", flex:"1", color:"#fda400" }}
                    />
                    <MDBInput  
                        id={`email-${member.id}`} 
                        type='text' 
                        placeholder="Email" 
                        value={member.email}
                        onChange={(e) => updateMember(member.id, 'email', e.target.value)}
                        style={{backgroundColor:"#160016", flex:"1", color:"#fda400" }}
                    />
                    <MDBInput  
                        id={`role-${member.id}`} 
                        type='text' 
                        placeholder="Role" 
                        value={member.role}
                        onChange={(e) => updateMember(member.id, 'role', e.target.value)}
                        style={{backgroundColor:"#160016", flex:"1", color:"#fda400" }}
                    />
                    {members.length > 1 && (
                        <MDBBtn
                            onClick={() => removeMember(member.id)}
                            color="tertiary"
                            style={{
                                color: "#ff4444",
                                paddingTop: "5px",
                                paddingBottom: "5px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                minWidth: "auto"
                            }}
                        >
                            <MDBIcon fas icon="trash" />
                        </MDBBtn>
                    )}
                </div>
            ))}
            
            <div style={{display:"Inline-block",width:"35vw", margin:"auto", position:"relative"}}>
                <div style={{display:"Inline-block"}}><MDBBtn
        onClick={addMember}
        color="tertiary"
        style={{
          color: "#fda400",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingRight: "0px",
          paddingLeft:"0px",
        }}
      >
        <MDBIcon fas icon="plus-circle" /> Add another member
      </MDBBtn></div>
                
            </div>
            </div>
        </div>
    )}
        else{
            return (
              <div>
                <div
                  style={{
                    textAlign: "left",
                    width: "35vw",
                    margin: "auto",
                    color: "white",
                  }}
                >
                  <p style={{ fontSize: "18px" }}>
                    <h3 style={{ color: "#fda400" }}>
                      <strong>Production Details</strong>
                    </h3>{" "}
                    Please provide full names, emails, and roles of of the members
                    involved in this production. By submitting cast and crew
                    information, you authorize FylmTV to verify it. You
                    acknowledge that we will invite the submitted individuals to
                    sign up on FylmTV for verification, future collaboration,
                    and additional benefits.
                  </p>
                  <MDBInput
                    id="form1"
                    type="text"
                    placeholder="Search users by ID code"
                    style={{ backgroundColor: "#160016" }}
                  />
                  <div
                    style={{
                      display: "Inline-block",
                      width: "35vw",
                      margin: "auto",
                      position: "relative",
                    }}
                  >
                    <div style={{ display: "Inline-block" }}>
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
                        <MDBIcon fas icon="plus-circle" /> Add a member manually
                      </MDBBtn>
                    </div>
                    <div
                      style={{
                        display: "Inline-block",
                        position: "absolute",
                        right: "0",
                      }}
                    >
                      <MDBBtn
                        onClick={() => setUserName(!userName)}
                        color="tertiary"
                        style={{
                          color: "white",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          paddingLeft: "15px",
                          paddingRight: "0px",
                        }}
                      >
                        Search by username
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              </div>
            );}
        

}