import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import "../../styles/pages/login/login.css";
import "../../styles/pages/register/register.css";
import Logo from "../Logo";
import Error from "../Error";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import Loading from "../Loading";

const Register = () => {
  const initialState = {
    full_name: "",
    username: "",
    email: "",
    description: "",
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const { state, bind } = useForm(initialState);
  const { POST } = useFetch();
  const nav = useNavigate();

  const handleSubmit = async () => {
    if (state.password !== state.confirmPassword)
      return setError({ status: true, message: "Passwords must match" });

    setLoading(true);

    return await POST("users", false, state).then(
      (res) => {
        localStorage.setItem("token", res.data.access_token);

        setLoading(false);
        return nav("/dashboard");
      },
      (reason) => setError({ status: true, message: reason })
    );
  };

  useEffect(() => {
    if (localStorage.getItem("/dashboard")) return nav("/dashboard");
  }, []);

  return (
    <div className="login register">
      <div className="container">
        <div className="login-card">
          <Logo size={2.2} />
          <div className="login-fields">
            <div className="register-name-container">
              <div className="full-name-container">
                <label>Full Name</label>
                <input type="text" name="full_name" {...bind} />
              </div>
              <div className="username-container">
                <label>Username</label>
                <input type="text" name="username" {...bind} />
              </div>
            </div>

            <label>Email</label>
            <input type="email" name="email" {...bind} />
            <label>Password</label>
            <input type="password" name="password" {...bind} />
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              {...bind}
            />
          </div>
          <button
            type="submit"
            className="login-submit btn-tetiary"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="register-link">
              Login here.
            </Link>
          </p>
          {loading && <Loading />}
          {error.status && <Error message={error.message} />}
        </div>
      </div>
    </div>
  );
};

export default Register;
