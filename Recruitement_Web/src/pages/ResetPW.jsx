import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../components/Auth/Login/styles.module.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const ResetPW = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/adminLogin";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
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
    <div className="adminLoginContainer">
      <Header />
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Reset Your Password</h1>
              <input
                type="password"
                placeholder="Old Password"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="New Password"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn}>
                Reset
              </button>
            </form>
          </div>
          <div className={styles.right}>
            <h1>Reset Password</h1>
            <span
              style={{
                fontSize: "16px",
                marginBottom: "10px",
                color: "white",
                textAlign: "center",
              }}
            >
              Please enter your new password and re-enter your new password to
              rest your password.
            </span>

            <img
              style={{
                maxWidth: "250px",
                maxHeight: "250px",
              }}
              src="https://res.cloudinary.com/desnqqj6a/image/upload/v1657722063/Mobile_login-bro_ohbyf6.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPW;
