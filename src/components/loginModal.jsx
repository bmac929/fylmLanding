import React, { useState } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBBtn
} from "mdb-react-ui-kit";

export default function LoginModal({ show, setShow }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    console.log("Login attempt with:", { email, password });
    setShow(false);
  };

  return (
    <MDBModal show={show} setShow={setShow} tabIndex="-1">
      <MDBModalDialog centered>
        <MDBModalContent style={{ backgroundColor: "#160016" }}>
          <MDBModalHeader>
            <MDBModalTitle style={{ color: "#fda400" }}><strong>Login</strong></MDBModalTitle>
            <button
              onClick={() => setShow(false)}
              style={{ 
                color: "#fda400",
                border: "none",
                boxShadow: "none",
                padding: "0.5rem",
                backgroundColor: "#160016",
                cursor: "pointer"
              }}
            >
              <i className="fas fa-times" />
            </button>
          </MDBModalHeader>
          <MDBModalBody>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", color:"#fda400"}}>
              <MDBInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ color: "white" }}
                contrast
              />
              <MDBInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ color: "white" }}
                contrast
              />
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <button
              style={{
                backgroundColor: "#fda400",
                color: "white",
                border: "none",
                borderRadius:"5px",
                cursor:"pointer",
                outline:"none",
                paddingTop:"10px",
                paddingBottom:"10px",
                paddingLeft:"20px",
                paddingRight:"20px",
                fontSize:"18px"
              }}
              onClick={handleLogin}
            >
              Login
            </button>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
} 