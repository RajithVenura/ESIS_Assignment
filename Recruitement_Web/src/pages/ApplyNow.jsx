import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { MdCloudUpload } from "react-icons/md";
import "./ApplyNow.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";
import styles from "../components/Auth/Singup/styles.module.scss";

const ApplyNow = () => {
  //Get token from local storage
  const Token = localStorage.getItem("token");

  const params = useParams();

  const jobId = params.id;

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [userResumeUrl, setuserResumeUrl] = useState(null);
  const [emailSubject, setemailSubject] = useState();
  const [emailBody, setemailBody] = useState();
  const [fullName, setfullName] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!fullName) {
        setError("Please enter your full name");
      } else if (!emailSubject) {
        setError("Please enter email subject");
      } else if (!emailBody) {
        setError("Please enter email body");
      } else if (!userResumeUrl) {
        setError("Please upload your resume");
      } else {
        const fileName = new Date().getTime().toString() + userResumeUrl.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, userResumeUrl);

        //Upload the file to Firebase Storage
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + " % done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((userResumeUrl) => {
              console.log("File available at :", userResumeUrl);

              const data = {
                userResumeUrl: userResumeUrl,
                emailSubject: emailSubject,
                emailBody: emailBody,
                fullName: fullName,
              };
              console.log(data);
              axios
                .post(
                  `http://localhost:8080/api/applyJob/apply/${jobId}`,
                  data,
                  {
                    headers: {
                      Authorization: `${Token}`,
                    },
                  }
                )
                .then(() => {
                  setError("True");
                  setTimeout(() => navigate("/Home"), 1500);
                })
                .catch((res) => {
                  console.log(res);
                  setError("False");
                });
            });
          }
        );
      }
    } catch (error) {
      console.log(error);

      setError("Something went wrong");
    }
  };
  return (
    <>
      <Header />
      <div className="add-new-admin">
        <div className="topic-admin">Apply Now</div>
        <span className="desc-admin">
          You can input your details here. We will send it to the relevant
          receiver.
        </span>

        <div className="personal-info-container">
          <form className="addNewAdmin-form">
            <div className="form-left">
              <div className="input-box">
                <input
                  type="text"
                  required
                  onChange={(e) => setfullName(e.target.value)}
                />
                <label>Full Name</label>
              </div>

              <div className="input-box">
                <input
                  type="text"
                  required
                  onChange={(e) => setemailSubject(e.target.value)}
                />
                <label>Email Subject</label>
              </div>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontWeight: "200",
                  marginBottom: "10px",
                }}
              >
                Upload Your Resume{" "}
                <MdCloudUpload style={{ color: "red", marginTop: "5px" }} />
              </span>
              <div class="input-box">
                <input
                  type="file"
                  required
                  style={{ padding: "10px 20px", marginTop: "-15px" }}
                  autoFocus={true}
                  onChange={(e) => setuserResumeUrl(e.target.files[0])}
                />
              </div>

              <div
                class="input-box"
                style={{
                  height: "100px",
                }}
              >
                <textarea
                  type="text"
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                  required
                  onChange={(e) => setemailBody(e.target.value)}
                />
                <label>Message </label>
              </div>

              <br />

              <br />
              <br />
            </div>

            <div className="form-right">
              <div className="right-img">
                <img
                  src="https://res.cloudinary.com/desnqqj6a/image/upload/v1665211757/Mailbox-bro_1_jh1kxo.png"
                  alt=""
                />
              </div>
            </div>
          </form>

          {error === "True" ? (
            <div
              className={styles.error_msg}
              style={{
                backgroundColor: "green",
                width: "50%",
                margin: "auto",
                marginBottom: "50px",
              }}
            >
              <div>Applied Succesfully!</div>
            </div> ? (
              error === "False"
            ) : (
              <div
                className={styles.error_msg}
                style={{
                  width: "50%",
                  margin: "auto",
                  marginBottom: "50px",
                }}
              >
                <div>{error}</div>
              </div>
            )
          ) : null}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-30px",
              marginBottom: "50px",
            }}
          >
            <input
              type="submit"
              value="Apply Now"
              onClick={handleSubmit}
              style={{
                padding: "10px 40px",
                backgroundColor: "#17bf9e",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplyNow;
