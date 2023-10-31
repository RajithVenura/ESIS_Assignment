import React, { useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Container } from "reactstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Feedbacks.scss";
import Popup from "reactjs-popup";
import UpdateFeedbackPopup from "./UpdateFeedbackPopup";
//import { Rating } from "react-simple-star-rating";
import axios from "axios";
import ReactStars from "react-stars";
import RatingStats from "./RatingStats";

const Feedbacks = () => {
  const Token = localStorage.getItem("token");

  const styles = {
    stars: {
      display: "flex",
      flexDirection: "row",
    },
  };
  //Popup for profile and logout
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [ratingAverage, setRatingAverage] = useState(0.0);
  const [ratings, setRatings] = useState([]);
  const [raterCount, setRaterCount] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [data, setData] = useState({});
  const [feebackData, setFeedbackData] = useState([]);



  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const closeModal = () => setOpen(false);

  const handleOpen = (item) => {
    setFeedbackData(item);
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  //delete feedback
  const onDelete = async (id) => {
    if (window.confirm("Are you sure you wish to delete this Feedback?")) {
      axios
        .delete(`http://localhost:8080/api/feedbacks/deleteFeedback/${id}`, {
          headers: {
            Authorization: `${Token}`,
          },
        })
        .then((res) => {
          alert("Feedback Deleted Successfully");
          window.location.reload();
        });
    }
  };

  const OnFormSubmit = async (e) => {
    e.preventDefault();

    // if (this.rating === 0) {
    //   console.log('this is in check function')
    //   setOpen(true)
    //   return;
    // }

    const feedback = {
      rating: rating,
      comment: message,
    };

    axios
      .post("http://localhost:8080/api/feedbacks/addFeedback", feedback, {
        headers: {
          Authorization: `${Token}`,
        },
      })
      .then((res) => {
        alert("Feedback Added");
        window.location.reload();
      })
      .catch((error) => {
        alert("Please Register To the Application");
        console.log(error.message);
      });
  };

  useEffect(() => {
    const getDetails = () => {
      axios
        .get("http://localhost:8080/api/feedbacks/getFeedbacks")

        .then((res) => {
          setFeedbacks(res.data.feedbacks);
        })

        .catch((err) => {
          alert(err.message);
        });
    }

    const getUser = () => {
      axios
        .get("http://localhost:8080/api/user/userProfile", {
          headers: {
            Authorization: `${Token}`,
          },
        })
        .then((res) => {
          setData(res.data.logedUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getUser();
    getDetails();
  }, []);

  return (
    <div>
      <Container className="feedbacks-container">
        <Header />
        <div className="feedbacks-content">
          <div className="feedbacks-content__section01">
            <RatingStats />
          </div>

          <div className="feedbacks-content__section02">
            <div className="feedbacks-content__section02-content">
              <div className="feedbacks-content__section02-content-title">
                Give Us Your Feedback
              </div>
              <div className="feedbacks-content__section02-content-subtitle">
                We are always looking for ways to improve our service. Please
                let us know how we can help you.
              </div>

              <div className="feedbacks-content__section02-content-cfeedback">
                <div className="feedbacks-content__section02-content-cfeedback-stars">
                  <div style={styles.stars}>
                    {/* <Rating onClick={handleRating} /> */}
                  </div>
                </div>

                <div className="feedbacks-content__section02-content-cfeedback-text">
                  <textarea
                    className="feedbacks-content__section02-content-cfeedback-textarea"
                    placeholder="Write your feedback here"
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleMessageChange}
                  ></textarea>
                </div>

                <button
                  onClick={OnFormSubmit}
                  className="feedbacks-content__section02-content-cfeedback-text-btn-submit"
                >
                  Add Feedback
                </button>
              </div>
            </div>
          </div>

          <div className="feedbacks-content__section03">
            {feedbacks.map((item) =>
              item.userId === data._id ? (
                <div className="feedbacks-content__section03-feedbackcard">
                  <div className="feedbacks-content__section03-feedbackcard-header">
                    <div className="feedbacks-content__section03-feedbackcard-header-left">
                      <div className="feedbacks-content__section03-feedbackcard-header-left-img">
                        <img src={item.imageUrl} alt="" />
                      </div>
                      <div className="feedbacks-content__section03-feedbackcard-header-left-name">
                        <div className="feedbacks-content__section03-feedbackcard-header-left-name-title">
                          {item.fullName}
                        </div>
                        <div className="feedbacks-content__section03-feedbackcard-header-left-name-stars">
                          <div
                            style={{
                              color: "#FABD3B",
                              display: "flex",
                              gap: "0.5rem",
                              fontSize: "20px",
                            }}
                          >
                            <ReactStars
                              size={25}
                              value={item.rating}
                              edit={false}
                              isHalf={true}
                              emptyIcon={<i className="far fa-star"></i>}
                              halfIcon={<i className="fa fa-star-half-alt"></i>}
                              fullIcon={<i className="fa fa-star"></i>}
                              activeColor="#ffd700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="feedbacks-content__section03-feedbackcard-right">
                      <div
                        className="feedbacks-content__section03-feedbackcard-right-edit"
                        onClick={(event) => handleOpen(item)}
                      >
                        <i
                          className="ri-edit-2-line text-dark"
                          title="Edit"
                        ></i>
                      </div>
                      <div className="feedbacks-content__section03-feedbackcard-right-delete">
                        <i
                          className="ri-delete-bin-line text-danger"
                          title="Delete"
                          onClick={(event) => onDelete(item._id)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div className="feedbacks-content__section03-feedbackcard-content">
                    <div className="feedbacks-content__section03-feedbackcard-content-text">
                      {item.comment}
                    </div>
                  </div>
                </div>
              ) : null
            )}

            {feedbacks.map((item) =>
              item.userId != data._id ? (
                <div className="feedbacks-content__section03-feedbackcard">
                  <div className="feedbacks-content__section03-feedbackcard-header">
                    <div className="feedbacks-content__section03-feedbackcard-header-left">
                      <div className="feedbacks-content__section03-feedbackcard-header-left-img">
                        <img src={item.imageUrl} alt="" />
                      </div>
                      <div className="feedbacks-content__section03-feedbackcard-header-left-name">
                        <div className="feedbacks-content__section03-feedbackcard-header-left-name-title">
                          {item.fullName}
                        </div>
                        <div className="feedbacks-content__section03-feedbackcard-header-left-name-stars">
                          <div
                            style={{
                              color: "#FABD3B",
                              display: "flex",
                              gap: "0.5rem",
                              fontSize: "20px",
                            }}
                          >
                            <ReactStars
                              size={25}
                              value={item.rating}
                              edit={false}
                              isHalf={true}
                              emptyIcon={<i className="far fa-star"></i>}
                              halfIcon={<i className="fa fa-star-half-alt"></i>}
                              fullIcon={<i className="fa fa-star"></i>}
                              activeColor="#ffd700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="feedbacks-content__section03-feedbackcard-content">
                    <div className="feedbacks-content__section03-feedbackcard-content-text">
                      {item.comment}
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="feedbackcard-popup">
          <Popup
            open={open}
            closeOnDocumentClick
            contentStyle={{
              marginTop: "100px",
              width: "50%",
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "20px",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            }}
          >
            <UpdateFeedbackPopup  {...feebackData} />
          </Popup>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Feedbacks;
