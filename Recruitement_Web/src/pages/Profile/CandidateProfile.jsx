import React, { useEffect, useState } from "react";
import {
  FaCalendarDay,
  FaEnvelopeOpenText,
  FaMapPin,
  FaPhoneAlt,
  FaRedoAlt,
  FaTrash,
  FaUserEdit,
  FaUserTie,
} from "react-icons/fa";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Container } from "reactstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./CandidateProfile.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import AppliedJobs from "../Applications/AppliedJobs";
import SavedJobs from "../SavedJobs/SavedJobs";

const CandidateProfile = () => {
  //Select tab
  const [selectedTab, setSelectedTab] = useState(
    "ABOUT" || "APPLICATIONS" || "SAVED"
  );
  //Get the user from local storage
  const Token = localStorage.getItem("token");

  //get user data from db
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    phoneNo: "",
    cv: "",
    imageUrl: "",
    dob: "",
    address: "",
    description: "",
    heading: "",
    createdDate: "",
    fburl: "",
    instaurl: "",
    lnkdinurl: "",
    pturl: "",
    tturl: "",
  });

  //use Effect

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/userProfile", {
        headers: {
          Authorization: `${Token}`,
        },
      })
      .then((res) => {
        setData(res.data.logedUser);
        console.log(res.data.logedUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      <Container className="profile-container">
        <div className="profile-container__header">
          <div className="profile-container__header-left">
            <div className="profile-container__header-left-image">
              <img
                src={
                  data.imageUrl
                    ? data.imageUrl
                    : "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg"
                }
                alt=""
              />
            </div>

            <div className="profile-container__header-left-content">
              <div className="profile-container__header-left-content-name">
                <span>{data.fullName}</span>
                <span>{data.heading || "Inset Heading Here *"}</span>
              </div>

              <div className="profile-container__header-left-content-links">
                <a
                  href={data.fburl || "#"}
                  style={{
                    color: "transparent",
                  }}
                >
                  <i className="ri-facebook-fill"></i>
                </a>
                <a
                  href={data.instaurl || "#"}
                  style={{
                    color: "transparent",
                  }}
                >
                  <i className="ri-github-fill"></i>
                </a>
                <a
                  href={data.lnkdinurl || "#"}
                  style={{
                    color: "transparent",
                  }}
                >
                  <i className="ri-linkedin-box-fill"></i>
                </a>
                <a
                  href={data.tturl || "#"}
                  style={{
                    color: "transparent",
                  }}
                >
                  <i className="ri-twitter-fill"></i>{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="profile-container__header-right">
            <div className="profile-container__header-right-content">
              <Link to={`/Profile/edit`}>
                <button
                  className="edit-btn"
                  style={{
                    backgroundColor: "#17BF9E",
                  }}
                >
                  <span className="icon">
                    <FaUserEdit />
                  </span>
                  <div className="text">Edit Profile</div>
                </button>
              </Link>

              <Link to={`/Profile/resetPW`}>
                <button
                  className="logout-btn"
                  style={{
                    backgroundColor: "#17BF9E",
                  }}
                >
                  <span className="icon">
                    <FaRedoAlt />
                  </span>
                  <div className="text">Reset Password</div>
                </button>
              </Link>

              <button
                className="logout-btn"
                style={{
                  backgroundColor: "#1A97F5",
                }}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              >
                <span className="icon">
                  <FiLogOut />
                </span>
                <div className="text">Logout</div>
              </button>
            </div>
          </div>
        </div>

        <div className="profile-container__body">
          <div className="settings__top-tabs">
            <div
              className={`settings__roaster-tab ${
                selectedTab === "ABOUT" ? "settings-tab-active" : ""
              }`}
              onClick={() => {
                setSelectedTab("ABOUT");
              }}
            >
              About
            </div>
            <div
              className={`settings__assign-tutor-tab ${
                selectedTab === "APPLICATIONS" ? "settings-tab-active" : ""
              }`}
              onClick={() => {
                setSelectedTab("APPLICATIONS");
              }}
            >
              Applications
            </div>
            <div
              className={`settings__assign-label-tab ${
                selectedTab === "SAVED" ? "settings-tab-active" : ""
              }`}
              onClick={() => {
                setSelectedTab("SAVED");
              }}
            >
              Saved
            </div>
          </div>

          <div className="profile-container__body-content">
            {selectedTab === "ABOUT" ? (
              <div className="profile-container__body-content-about">
                <div className="profile-container__body-content-about-left">
                  <div className="profile-container__body-content-about-left-header">
                    <h5>Personal Information</h5>
                  </div>
                  <div className="profile-container__body-content-about-left-content">
                    <div className="profile-container__body-content-about-left-content-item">
                      <div className="profile-container__body-content-about-left-content-item-icon">
                        <FaUserTie />
                      </div>
                      <div className="profile-container__body-content-about-left-content-item-text">
                        <span>Full Name</span>
                        <span>{data.fullName}</span>
                      </div>
                    </div>

                    <div className="profile-container__body-content-about-left-content-item">
                      <div className="profile-container__body-content-about-left-content-item-icon">
                        <FaCalendarDay />
                      </div>
                      <div className="profile-container__body-content-about-left-content-item-text">
                        <span>Date of Birth</span>
                        <span>{data.dob || "Please insert your DOB"}</span>
                      </div>
                    </div>

                    <div className="profile-container__body-content-about-left-content-item">
                      <div className="profile-container__body-content-about-left-content-item-icon">
                        <FaPhoneAlt />
                      </div>
                      <div className="profile-container__body-content-about-left-content-item-text">
                        <span>Contact Number</span>
                        <span>
                          {data.phoneNo || "Please insert your contact number"}
                        </span>
                      </div>
                    </div>

                    <div className="profile-container__body-content-about-left-content-item">
                      <div className="profile-container__body-content-about-left-content-item-icon">
                        <FaEnvelopeOpenText />
                      </div>
                      <div className="profile-container__body-content-about-left-content-item-text">
                        <span>Email</span>
                        <span>{data.email}</span>
                      </div>
                    </div>

                    <div className="profile-container__body-content-about-left-content-item">
                      <div className="profile-container__body-content-about-left-content-item-icon">
                        <FaMapPin />
                      </div>
                      <div className="profile-container__body-content-about-left-content-item-text">
                        <span>Address</span>
                        <span>
                          {data.address || "Please insert your address"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="vl"></div>

                <div className="profile-container__body-content-about-right">
                  <div className="profile-container__body-content-about-right-description">
                    <h6>Bio</h6>
                    <span>
                      {data.description ||
                        "Please insert your bio to let others know you"}
                    </span>
                  </div>

                  <div className="profile-container__body-content-about-right-content">
                    <div className="profile-container__body-content-about-right-content-icon">
                      <FaEnvelopeOpenText />
                    </div>
                    <div className="profile-container__body-content-about-right-content-text">
                      <span>Portfolio Link</span>
                      <span>
                        {data.pturl || "Please insert your portfolio link"}
                      </span>
                    </div>
                  </div>

                  <div className="profile-container__body-content-about-right-resume">
                    <div className="profile-container__body-content-about-right-resume-header">
                      <h6>Resume</h6>
                    </div>

                    <div className="profile-container__body-content-about-right-resume-content">
                      <div className="CV">
                        <div className="profile-container__body-content-about-right-resume-content-icon">
                          <BsFillFileEarmarkTextFill
                            onClick={() =>
                              window.open(
                                "http://www.africau.edu/images/default/sample.pdf"
                              )
                            }
                            style={{
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        {/* {data.cv === true ? (
                          <div className="profile-container__body-content-about-right-resume-content-icon">
                            <BsFillFileEarmarkTextFill
                              onClick={() => window.open(data.cv)}
                              style={{
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        ) : (
                          <span>
                            Please upload your resume to let others know you
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className="profile-container__body-content-about-right-delete">
                    <div className="profile-container__body-content-about-right-delete-button">
                      <FaTrash />
                      <button>Delete Profile</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedTab === "APPLICATIONS" ? (
              <div className="profile-container__body-content-applications">
                <AppliedJobs />
              </div>
            ) : selectedTab === "SAVED" ? (
              <div className="profile-container__body-content-saved">
                <SavedJobs />
              </div>
            ) : null}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default CandidateProfile;
