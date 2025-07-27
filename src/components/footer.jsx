import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter
      style={{ backgroundColor: "#160016", paddingTop: "15vh" }}
      className="text-center text-lg-start text-muted"
    >
      <MDBContainer className="p-4" style={{ margin: "auto" }}>
        <MDBRow style={{ color: "#fda400", margin: "auto" }}>
          <MDBCol
            lg="4"
            md="6"
            className="mb-3 mb-md-0"
            style={{ color: "#fda400" }}
          >
            <ul className="list-unstyled mb-0" style={{ color: "#fda400" }}>
              <li>
                <a href="#!" style={{ color: "#fda400" }}>
                  <strong>Privacy</strong>
                </a>
              </li>
              <br />
              <li>
                <a href="#!" style={{ color: "#fda400" }}>
                  <strong>Contact Us</strong>
                </a>
              </li>
              <br />
              <li>
                <a href="#!" style={{ color: "#fda400" }}>
                  <strong>Help Center</strong>
                </a>
              </li>
              <br />
              <li>
                <a href="#!" style={{ color: "#fda400" }}>
                  <strong>FAQ</strong>
                </a>
              </li>
              <br />
            </ul>
          </MDBCol>

          <MDBCol lg="4" md="6" className="mb-3 mb-md-0">
            <ul className="list-unstyled">
              <li>
                <a href="#!" style={{ color: "#fda400" }}>
                  <strong>Terms of Use</strong>
                </a>
              </li>
              <br />
              <li>
                <a href="#!" style={{ color: "#fda400" }}>
                  <strong>Cookie Preferences</strong>
                </a>
              </li>
              <br />
              <li>
                <a href="#!" style={{ color: "#fda400" }}>
                  <strong>Ad Choices</strong>
                </a>
              </li>
              <br />
              <li>
                <a href="#!" style={{ color: "#fda400" }}>
                  <strong>About Us</strong>
                </a>
              </li>
              <br />
            </ul>
          </MDBCol>

          <MDBCol lg="4" md="6" className="mb-3 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" style={{ color: "#fda400" }}>
                  <strong>We Need</strong>
                </a>
              </li>
              <br />
              <li>
                <a href="#!" style={{ color: "#fda400" }}>
                  <strong>More Links</strong>
                </a>
              </li>
              <br />
              <li>
                <a href="#!" style={{ color: "#fda400" }}>
                  <strong>To Go</strong>
                </a>
              </li>
              <br />
              <li>
                <a href="#!" style={{ color: "#fda400" }}>
                  <strong>Right Here</strong>
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block"></div>

        <div>
          <a
            href="https://www.facebook.com/FylmTV"
            target="_blank"
            className="me-4 text-reset"
          >
            <MDBIcon color="white" fab icon="facebook-f" />
          </a>
          <a
            href="https://www.instagram.com/fylm.tv/"
            style={{ marginLeft: "25px" }}
            target="_blank"
            className="me-4 text-reset"
          >
            <MDBIcon color="white" fab icon="instagram" />
          </a>
          <a
            href="https://www.youtube.com/@fylmtv7837"
            style={{ marginLeft: "25px" }}
            target="_blank"
            className="me-4 text-reset"
          >
            <MDBIcon color="white" fab icon="youtube" />
          </a>
          <a
            href="https://discord.gg/wcF25fek-"
            style={{ marginLeft: "25px" }}
            target="_blank"
            className="me-4 text-reset"
          >
            <MDBIcon color="white" fab icon="discord" />
          </a>
          <a
            href="https://twitter.com/fylm_tv"
            style={{ marginLeft: "25px" }}
            target="_blank"
            className="me-4 text-reset"
          >
            <MDBIcon color="white" fab icon="twitter" />
          </a>
        </div>
      </section>
    </MDBFooter>
  );
}
