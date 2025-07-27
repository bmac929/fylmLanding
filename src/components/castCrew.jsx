import React from "react";
import {
  MDBIcon,
  MDBBtn,
  MDBInput,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBRow,
  MDBCol,
  MDBTextArea,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Bryan from "../images/Bryan.jpg";
import Malik from "../images/Malik.jfif";
import Summer from "../images/Summer.jfif";

export default function CastCrew() {
  return (
    <div style={{ textAlign: "left", width: "35vw", margin: "auto" }}>
      <p style={{ fontSize: "18px" }}>
        <h5 style={{ color: "#fda400" }}>
          <strong>Cast & Crew</strong>
        </h5>
      </p>
      <br />
      <div
        style={{ width: "35vw", backgroundColor: "#2a082a", margin: "auto" }}
      >
        <div>
        <div
          style={{
            display: "inline-block",
            height: "10vh",
            position: "relative",
            width: "35vw",
            margin: "auto",
            width: "35vw",
            padding: "10px",
          }}
        >
          <img
            src={Bryan}
            className="img-fluid rounded-circle"
            style={{ height: "8vh" }}
            alt=""
          />

          <div style={{ display: "inline-block" }}>
            <p style={{ color: "#fda400", position: "absolute", top: "40%" }}>
              <h6>
                <strong> &nbsp;Bryan McCann</strong>
              </h6>
            </p>
            <p style={{ color: "white", position: "absolute" }}>
              <h8>&nbsp;bmac929</h8>
            </p>
          </div>
          <div
            style={{
              display: "inline-block",
              position: "absolute",
              right: "0",
            }}
          >
            <MDBBtn
              color="tertiary"
              style={{
                color: "white",
                paddingTop: "5px",
                paddingBottom: "5px",
                paddingLeft: "15px",
                paddingRight: "0px",
                boxShadow: "none",
              }}
            >
              <MDBIcon fas icon="ellipsis-v" style={{ color: "white" }} />
            </MDBBtn>
          </div>
          
        </div>
        <br />
          <MDBRow style={{width:"100%", margin:"auto"}}>
            <MDBDropdown>
              <MDBDropdownToggle
                style={{ width: "34vw"}}
              >
                Select all roles that apply
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <form className="px-4 py-3">
                  <MDBRow className="mb-4">
                    <MDBCol className="d-flex justify-content-center">
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Actor"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Producer"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Sound"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Camera"
                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Director"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Producer"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Sound"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Camera"
                      />
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBRow> 
        </div>
        <div>
        <div
          style={{
            display: "inline-block",
            height: "10vh",
            position: "relative",
            width: "35vw",
            margin: "auto",
            width: "35vw",
            padding: "10px",
          }}
        >
          <img
            src={Malik}
            className="img-fluid rounded-circle"
            style={{ height: "8vh" }}
            alt=""
          />

          <div style={{ display: "inline-block" }}>
            <p style={{ color: "#fda400", position: "absolute", top: "40%" }}>
              <h6>
                <strong> &nbsp;Malik Jackson</strong>
              </h6>
            </p>
            <p style={{ color: "white", position: "absolute" }}>
              <h8>&nbsp;debow</h8>
            </p>
          </div>
          <div
            style={{
              display: "inline-block",
              position: "absolute",
              right: "0",
            }}
          >
            <MDBBtn
              color="tertiary"
              style={{
                color: "white",
                paddingTop: "5px",
                paddingBottom: "5px",
                paddingLeft: "15px",
                paddingRight: "0px",
                boxShadow: "none",
              }}
            >
              <MDBIcon fas icon="ellipsis-v" style={{ color: "white" }} />
            </MDBBtn>
          </div>
          
        </div>
        <br />
          <MDBRow style={{width:"100%", margin:"auto"}}>
            <MDBDropdown>
              <MDBDropdownToggle
                style={{ width: "34vw"}}
              >
                Select all roles that apply
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <form className="px-4 py-3">
                  <MDBRow className="mb-4">
                    <MDBCol className="d-flex justify-content-center">
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Actor"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Producer"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Sound"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Camera"
                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Director"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Producer"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Sound"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Camera"
                      />
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBRow> 
        </div>
        <div>
        <div
          style={{
            display: "inline-block",
            height: "10vh",
            position: "relative",
            width: "35vw",
            margin: "auto",
            width: "35vw",
            padding: "10px",
          }}
        >
          <img
            src={Summer}
            className="img-fluid rounded-circle"
            style={{ height: "8vh" }}
            alt=""
          />

          <div style={{ display: "inline-block" }}>
            <p style={{ color: "#fda400", position: "absolute", top: "40%" }}>
              <h6>
                <strong> &nbsp;Summer Zheng</strong>
              </h6>
            </p>
            <p style={{ color: "white", position: "absolute" }}>
              <h8>&nbsp;thatgogogirl</h8>
            </p>
          </div>
          <div
            style={{
              display: "inline-block",
              position: "absolute",
              right: "0",
            }}
          >
            <MDBBtn
              color="tertiary"
              style={{
                color: "white",
                paddingTop: "5px",
                paddingBottom: "5px",
                paddingLeft: "15px",
                paddingRight: "0px",
                boxShadow: "none",
              }}
            >
              <MDBIcon fas icon="ellipsis-v" style={{ color: "white" }} />
            </MDBBtn>
          </div>
          
        </div>
        <br />
          <MDBRow style={{width:"100%", margin:"auto"}}>
            <MDBDropdown>
              <MDBDropdownToggle
                style={{ width: "34vw"}}
              >
                Select all roles that apply
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <form className="px-4 py-3">
                  <MDBRow className="mb-4">
                    <MDBCol className="d-flex justify-content-center">
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Actor"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Producer"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Sound"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Camera"
                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Director"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Producer"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Sound"
                      />
                      <MDBCheckbox
                        className="d-flex justify-content-center"
                        label="Camera"
                      />
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBRow> 
        </div>
      </div>
    </div>
  );
}
