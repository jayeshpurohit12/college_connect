import React from "react";
import "./Footer.css";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const Footer = () => {
  return (
    <>
      <div className="Footer">
        <footer className="text-center text-lg-start bg-light text-muted">
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>

          <section>
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="footer_heading text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3"></i>College Connect
                  </h6>
                  <p>
                    This is a platform for the students of Acropolis Institute
                    of Technology and Research to connect with their alumni and
                    get the latest updates about the college.
                  </p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="footer_heading text-uppercase fw-bold mb-4">
                    Useful links
                  </h6>
                  <p>
                    <a href="/" className="link text-reset">
                      Home
                    </a>
                  </p>
                  <p>
                    <a href="/Achievements" className="link text-reset">
                      Achievements
                    </a>
                  </p>
                  <p>
                    <a href="/Internships" className="link text-reset">
                      Internships
                    </a>
                  </p>
                  <p>
                    <a href="/Jobs" className="link text-reset">
                      Jobs
                    </a>
                  </p>
                  <p>
                    <a href="/event" className="link text-reset">
                      Events
                    </a>
                  </p>
                </div>

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="footer_heading text-uppercase fw-bold mb-4">
                    Contact
                  </h6>
                  <p>
                    <i className="fas fa-home me-3"></i> India
                  </p>
                  <p>
                    <i className="fas fa-envelope me-3"></i>
                    info@example.com
                  </p>
                  <p>
                    <i className="fas fa-phone me-3"></i> + 91 234 567 88
                  </p>
                  <p>
                    <i className="fas fa-print me-3"></i> + 91 234 567 89
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div
            className="text-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          >
            © 2022 Copyright:
            <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
              MDBootstrap.com
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
