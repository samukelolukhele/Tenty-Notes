import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import "../../styles/pages/login/login.css";
import Logo from "../Logo";
import Error from "../Error";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const url = "http://localhost:8080";

  const [error, setError] = useState({ status: false, message: "No error" });
  const [loading, setLoading] = useState(false);

  const handleError = () => {};

  const handleData = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const { email, password } = data;

    setError({ status: false, message: "" });

    // if ((email && password !== undefined) || "") {
    await axios
      .post(`${url}/users/login`, {
        email: email,
        password: password,
      })
      .then(() => redirect("/"))
      .catch((err) => setError({ status: true, message: "Error" }));
    // }

    console.log(email, password);

    // setError({ status: true, message: "Fields are empty" });
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login-card">
          <Logo size={2.2} />
          <div className="login-fields">
            <label>Email</label>
            <input type="email" name="email" onChange={handleData} />
            <label>Password</label>
            <input type="password" name="password" onChange={handleData} />
          </div>
          <button
            type="submit"
            className="login-submit btn-tetiary"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Register here.
            </Link>
          </p>
          {error.status && <Error message={error.message} />}
        </div>
      </div>
    </div>
  );
};

export default Login;
