import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Logo from "../images/orange-LOGO.png";
import Sign from "../components/signUp";
import SignUp from "./signUp";
import SignIn from "./logIn";
import LoginModal from "./loginModal";

export default function Nav2() {
  const [showNavText, setShowNavText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);
  const toggleLoginModal = () => setShowLoginModal(!showLoginModal);

  return (
    <>
      <MDBNavbar
        expand="lg"
        style={{
          backgroundColor: "#160016",
          paddingTop: "10px",
          paddingBottom: "10px",
          height: "8vh",
          paddingLeft: "6%",
          paddingRight: "6%",
        }}
      >
        <MDBContainer fluid>
          <MDBNavbarBrand href="#"></MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavText(!showNavText)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavText}>
            <MDBNavbarNav
              className="mr-auto mb-2 mb-lg-0"
              style={{ alignItems: "center" }}
            >
              <img
                src={Logo}
                style={{
                  height: "50px",
                  marginBottom: "-30px",
                  marginTop: "-25px",
                  marginRight: "15px",
                }}
              />
              <MDBNavbarLink
                href="/"
                style={{ color: "white", marginLeft: "50px", fontSize: "22px" }}
              >
                Home
              </MDBNavbarLink>
              &nbsp; &nbsp; &nbsp;
              <MDBNavbarLink
                href="/genres"
                style={{ color: "white", marginLeft: "25px", fontSize: "22px" }}
              >
                Genre
              </MDBNavbarLink>
              &nbsp; &nbsp; &nbsp;
              <MDBNavbarLink
                href="#"
                style={{ color: "white", marginLeft: "25px", fontSize: "22px" }}
              >
                Hot & New
              </MDBNavbarLink>
              &nbsp; &nbsp; &nbsp;
              <MDBNavbarLink
                href="#"
                style={{ color: "white", marginLeft: "25px", fontSize: "22px" }}
              >
                Staff Picks
              </MDBNavbarLink>
            </MDBNavbarNav>
          </MDBCollapse>
          <MDBIcon fas icon="search" size="lg" style={{ color: "#fda400" }} />
          <div onClick={toggleLoginModal}>
            <SignIn />
          </div>
          <SignUp />
          <MDBIcon 
            fas 
            icon="bars" 
            size="lg" 
            style={{ color: "white", cursor: "pointer", marginLeft: "20px" }} 
            onClick={toggleModal}
          />
        </MDBContainer>
      </MDBNavbar>

      <MDBModal show={showModal} setShow={setShowModal} tabIndex="-1">
        <MDBModalDialog 
          centered={false}
          style={{ 
            position: 'absolute',
            top: '8vh',
            right: '6%',
            margin: 0,
            transform: 'none',
            width:"11vw"
          }}
        >
          <MDBModalContent style={{ backgroundColor: "#160016" }}>
            <MDBModalHeader>
              <MDBModalTitle style={{ color: "#fda400" }}><strong>Menu</strong></MDBModalTitle>
              <button
                onClick={toggleModal}
                style={{ 
                  color: "#fda400",
                  border: "none",
                  boxShadow: "none",
                  padding: "0.5rem",
                  backgroundColor: "#160016",
                  cursor: "pointer"
                }}
              >
                <MDBIcon fas icon="times" size="lg" />
              </button>
            </MDBModalHeader>
            <MDBModalBody>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <button 
                  color="tertiary" 
                  style={{ 
                    color: "white", 
                    backgroundColor: "#654265",
                    border: "none",
                    height:"5vh",
                    width:"90%",
                    margin:"auto",
                    borderRadius:"5px",
                    textAlign:"center"
                  }}
                  href="https://discord.gg/ydYMYnpyVQ"
                  target="_blank"
                >
                  Discord Group
                </button>
                <button 
                  color="tertiary" 
                  style={{ 
                    color: "white", 
                    backgroundColor: "#654265",
                    border: "none",
                    height:"5vh",
                    width:"90%",
                    margin:"auto",
                    borderRadius:"5px",
                    textAlign:"center"
                  }}
                  href="https://discord.gg/ydYMYnpyVQ"
                  target="_blank"
                >
                  Facebook Group
                </button>
                <button 
                  color="tertiary" 
                  style={{ 
                    color: "white", 
                    backgroundColor: "#654265",
                    border: "none",
                    height:"5vh",
                    width:"90%",
                    margin:"auto",
                    borderRadius:"5px",
                    textAlign:"center"
                  }}
                >
                  <MDBIcon fas icon="sign-out-alt" style={{ marginRight: "10px" }} />
                  Logout
                </button>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <LoginModal show={showLoginModal} setShow={setShowLoginModal} />
    </>
  );
}
