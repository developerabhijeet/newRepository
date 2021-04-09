import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';

const Footer = () => {
  return (
    <MDBFooter color="blue" className="font-small footer pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-center">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Footer Content</h5>
            <p>
              Welcome to footer
            </p>
          </MDBCol>
          <MDBCol md="6" className="link-footer">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">FACEBOOK</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">INSTAGRAM</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">LINKEDIN</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">TWITTER</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; Copyright: {new Date().getFullYear()}  </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;