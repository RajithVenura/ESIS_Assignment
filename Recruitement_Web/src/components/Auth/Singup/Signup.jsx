import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.password !== data.cPassword) {
        setError("Passwords do not match");
      } else if (data.password.length < 6) {
        setError("Password must be at least 6 characters");
      } else {
        const url = "http://localhost:8080/api/user/userRegister";
        const { data: res } = await axios.post(url, data);
        navigate("/ActivationEmail");
        console.log(res.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="adminRegisterContainer">
      <Header />
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back!</h1>
            <span
              style={{ fontSize: "16px", marginBottom: "10px", color: "white" }}
            >
              Already have an account?
            </span>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                Log In
              </button>
            </Link>
            <img
              style={{
                maxWidth: "250px",
                maxHeight: "250px",
              }}
              src="https://res.cloudinary.com/desnqqj6a/image/upload/v1657722327/Sign_up-bro_1_orlgzw.png"
              alt=""
            />
          </div>
          <div className={styles.right}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="cPassword"
                onChange={handleChange}
                value={data.cPassword}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
