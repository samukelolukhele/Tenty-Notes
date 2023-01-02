import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import '../../styles/pages/login/login.css';
import '../../styles/pages/register/register.css';
import Logo from '../Logo';
import Error from '../Error';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading';
import { Circles } from 'react-loader-spinner';
import { colours } from '../utils/colours';
import PwdRequisites from '../utils/PwdRequisites';

const Register = () => {
  const initialState = {
    full_name: '',
    username: '',
    email: '',
    description: '',
  };

  const [loading, setLoading] = useState(false);
  const [pwdRequisites, setPwdRequisites] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    lowerLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
  });
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const { state, bind } = useForm(initialState);
  const { POST } = useFetch();
  const nav = useNavigate();

  const handleOnKeyUp = (e: ChangeEvent<any>) => {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const lowerLetterCheck = /[a-z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length > 7;

    setChecks({
      capsLetterCheck,
      lowerLetterCheck,
      numberCheck,
      pwdLengthCheck,
    });
  };

  const handleSubmit = async (e: ChangeEvent<any>) => {
    e.preventDefault();
    setError({ status: false, message: '' });
    Object.values(checks).some((v) => {
      if (v === false) {
        setLoading(false);
        return setError({
          status: true,
          message: 'Password requirements not met',
        });
      }
    });
    if (state.password !== state.confirmPassword)
      return setError({ status: true, message: 'Passwords must match' });

    setLoading(true);

    return await POST('users', false, state)
      .then((res) => {
        res.data.access_token &&
          localStorage.setItem('token', res.data.access_token);

        setLoading(false);
        return nav('/dashboard');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        return setError({ status: true, message: err.response.data.message });
      });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) return nav('/dashboard');
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
                <input type="text" name="full_name" {...bind} required />
              </div>
              <div className="username-container">
                <label>Username</label>
                <input type="text" name="username" {...bind} required />
              </div>
            </div>

            <label>Email</label>
            <input type="email" name="email" {...bind} required />
            <label>Password</label>
            <input
              type="password"
              name="password"
              onFocus={() => setPwdRequisites(true)}
              onBlur={() => setPwdRequisites(false)}
              onKeyUp={handleOnKeyUp}
              {...bind}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              {...bind}
            />
          </div>
          <hr className="register-divider" />
          {pwdRequisites && (
            <PwdRequisites
              capsCheck={checks.capsLetterCheck}
              lowerCheck={checks.lowerLetterCheck}
              lengthCheck={checks.lowerLetterCheck}
              numberCheck={checks.numberCheck}
            />
          )}
          <button
            type="submit"
            className="login-submit btn-tetiary"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <p>
            Already have an account?{' '}
            <Link to="/login" className="register-link">
              Login here.
            </Link>
          </p>
          {loading && (
            <Circles width={40} height={40} color={colours.tetiary} />
          )}
          {error.status && <Error message={error.message} />}
        </div>
      </div>
    </div>
  );
};

export default Register;
