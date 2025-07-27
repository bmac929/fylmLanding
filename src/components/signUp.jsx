import React, { useState } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [toggleOneModal, setToggleOneModal] = useState(false);
  const [toggleTwoModal, setToggleTwoModal] = useState(false);
  const [toggleThreeModal, setToggleThreeModal] = useState(false);
  const [toggleFourModal, setToggleFourModal] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subscription, setSubscription] = useState("");
  const navigate = useNavigate();

  const viewerFree = async (event) => {
    console.log("its Working!");
    setUserName(event.target.value);
    setFirstName(event.target.value);
    setLastName(event.target.value);
    setEmail(event.target.value);
    setSubscription("viewer free");

    let user = {
      userName,
      firstName,
      lastName,
      email,
      subscription,
    };

    await axios.post("api/user", { user });
  };

  const handleClick = () => {
    navigate('/signup/membership');
  }

 
  return (
    <>
      
      <button 
      onClick={handleClick}
      style={{
          color: "black",
          backgroundColor: "#fda400",
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "20px",
          paddingRight: "20px",
          marginRight: "20px",
          borderRadius: "5px",
          border:"none",
          fontSize: "18px",
        }}>
          Sign Up
      </button>

      <MDBModal show={toggleOneModal} setShow={setToggleOneModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Account Type</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setToggleOneModal(!toggleOneModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              Please select the type of account you want to create.
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                onClick={() => {
                  setToggleOneModal(!toggleOneModal);
                  setTimeout(() => {
                    setToggleTwoModal(!toggleTwoModal);
                  }, 400);
                }}
              >
                Viewer
              </MDBBtn>
              <MDBBtn
                onClick={() => {
                  setToggleOneModal(!toggleOneModal);
                  setTimeout(() => {
                    setToggleThreeModal(!toggleThreeModal);
                  }, 400);
                }}
              >
                Filmmaker
              </MDBBtn>
              <MDBBtn
                onClick={() => {
                  setToggleOneModal(!toggleOneModal);
                  setTimeout(() => {
                    setToggleFourModal(!toggleFourModal);
                  }, 400);
                }}
              >
                Business
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={toggleTwoModal} setShow={setToggleTwoModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Viewer</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setToggleTwoModal(!toggleTwoModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow center>
                <MDBCol size="6">
                  <h5>
                    <strong>Free</strong>
                  </h5>
                  Film Interactions
                  <br />
                  Like/Dislike
                  <br />
                  Favorite/Unfavorite
                  <br />
                  Share Externally <br />
                  Share with other viewers
                  <br />
                  Comment/Review
                  <br />
                  <MDBBtn
                    onClick={() => {
                      setToggleOneModal(!toggleTwoModal);
                      setTimeout(() => {
                        setToggleForm(!toggleForm);
                      }, 400);
                    }}
                  >
                    Select
                  </MDBBtn>
                </MDBCol>
                <MDBCol size="6">
                  <h5>
                    <strong>Premium+</strong>
                  </h5>
                  All Free features
                  <br />
                  No Advertisements*
                  <br />
                  <div style={{ fontSize: "10px" }}>
                    (Still get FylmTV Trailer)
                  </div>
                  More Customizable Profile
                  <br />
                  Direct Messaging
                  <br />
                  <br />
                  <MDBBtn>Select</MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                onClick={() => {
                  setToggleTwoModal(!toggleTwoModal);
                  setTimeout(() => {
                    setToggleOneModal(!toggleOneModal);
                  }, 400);
                }}
              >
                Back to first
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal
        show={toggleThreeModal}
        setShow={setToggleThreeModal}
        tabIndex="-1"
      >
        <MDBModalDialog centered size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Filmmaker</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setToggleThreeModal(!toggleThreeModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow center>
                <MDBCol size="3">
                  <h5>
                    <strong>Social</strong>
                  </h5>
                  All Viewer Free features
                  <br />
                  Full Social Media Access
                  <br />
                  Posts*
                  <br />
                  Posts Interactions*
                  <br />
                  Report Users
                  <br />
                  Direct Messages to Connections
                  <br />
                  Profile
                  <br />
                  Post Jobs (1-2/mo)
                  <br />
                  Create Groups (Invite Connects Only)
                  <br />
                  Buy/Sell Store Access
                  <br />
                  Distributions Submissions
                  <br />
                  <MDBBtn>Select</MDBBtn>
                </MDBCol>
                <MDBCol size="3">
                  <h5>
                    <strong>Social+</strong>
                  </h5>
                  All Social features
                  <br />
                  DM to Non-Connections
                  <br />
                  More Customizable Profile
                  <br />
                  Direct Messaging
                  <br />
                  Post Jobs (5/mo)
                  <br />
                  Personalized Portfolio
                  <br />
                  Groups (100 invites/mo)
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <MDBBtn>Select</MDBBtn>
                </MDBCol>
                <MDBCol size="3">
                  <h5>
                    <strong>Submiter</strong>
                  </h5>
                  All Social Features
                  <br />
                  Film Analytics
                  <br />
                  Film Page
                  <br />
                  Auto Acceptance to Social Platforms
                  <br />
                  Buy/Sell in store
                  <br />
                  Revenue Generation
                  <br />
                  Payouts
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <MDBBtn>Select</MDBBtn>
                </MDBCol>
                <MDBCol size="3">
                  <h5>
                    <strong>Submiter+</strong>
                  </h5>
                  All Submiter features
                  <br />
                  Stronger Film Analytics
                  <br />
                  Pay Distribution
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <MDBBtn>Select</MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                onClick={() => {
                  setToggleThreeModal(!toggleThreeModal);
                  setTimeout(() => {
                    setToggleOneModal(!toggleOneModal);
                  }, 400);
                }}
              >
                Back to first
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal
        show={toggleFourModal}
        setShow={setToggleFourModal}
        tabIndex="-1"
      >
        <MDBModalDialog centered size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Business</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setToggleFourModal(!toggleFourModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow center>
                <MDBCol size="4">
                  <h5>
                    <strong>Distribution</strong>
                  </h5>
                  Selection of films available for distribution
                  <br />
                  Message Filmmaker
                  <br />
                  Payouts
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <MDBBtn>Select</MDBBtn>
                </MDBCol>
                <MDBCol size="4">
                  <h5>
                    <strong>Social Navigators+</strong>
                  </h5>
                  Pro Account
                  <br />
                  Allows Redirect to Company Site
                  <br />
                  Promote Services
                  <br />
                  Report Users
                  <br />
                  Business Post
                  <br />
                  Direct Messaging
                  <br />
                  Follow Users
                  <br />
                  Unlimited Search
                  <br />
                  <br />
                  <br />
                  <MDBBtn>Select</MDBBtn>
                </MDBCol>
                <MDBCol size="4">
                  <h5>
                    <strong>Advertisements</strong>
                  </h5>
                  Submission of Ads
                  <br />
                  Product Placement Ad Offer
                  <br />
                  No Profile <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <MDBBtn>Select</MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                onClick={() => {
                  setToggleFourModal(!toggleFourModal);
                  setTimeout(() => {
                    setToggleOneModal(!toggleOneModal);
                  }, 400);
                }}
              >
                Back to first
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={toggleForm} setShow={setToggleForm} tabIndex="-1">
        <MDBModalDialog centered size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Business</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setToggleForm(!toggleForm)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow center></MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn onClick={viewerFree}>Register!</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
