import React, { useState } from "react";
import { FaRegStar, FaStar, FaWindowClose } from "react-icons/fa";
import "./UpdateFeedbackPopup.scss";
import axios from "axios";
//import { Rating } from "react-simple-star-rating";

const UpdateFeedbackPopup = (props) => {
  const [rating, setRating] = useState();
  const [message, setMessage] = useState(props.comment);
  const [id, setId] = useState("");

  const styles = {
    stars: {
      display: "flex",
      flexDirection: "row",
    },
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const updateFeedback = async (e) => {
    e.preventDefault();
    const Token = localStorage.getItem("token");

    const updateObject = {
      rating: rating,
      comment: message,
    }

    await axios.put(`http://localhost:8080/api/feedbacks/updateFeedback/${props._id}`, updateObject,{
      headers: {
        Authorization: `${Token}`,
      },
    })
    .then((res) => {
      window.location.href="/Feedbacks";
    })
    .catch((err) => {
      console.log(err)
      alert(err.message)
    })
  }

  return (
    <div className="feedbackcard-popup">
      <div
        className="close"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <FaWindowClose
          style={{
            width: "30px",
            height: "40px",
            border: "none",
            cursor: "pointer",
            color: "red",
            borderRadius: "20%",
          }}
        />
      </div>
      <div className="feedbacks-content__section02">
        <div className="feedbacks-content__section02-content">
          <div className="feedbacks-content__section02-content-title">
            Update Your Feedback
          </div>

          <div className="feedbacks-content__section02-content-cfeedback">
            <div className="feedbacks-content__section02-content-cfeedback-stars">
                <div style={styles.stars}>
                  {/* <Rating 
                  initialValue={props.rating}
                  onClick={handleRating} /> */}
                </div>
            </div>

            <div className="feedbacks-content__section02-content-cfeedback-text">
              <textarea
                className="feedbacks-content__section02-content-cfeedback-textarea"
                placeholder="Write your feedback here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button onClick={updateFeedback} className="feedbacks-content__section02-content-cfeedback-text-btn-submit">
              Update Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFeedbackPopup;
