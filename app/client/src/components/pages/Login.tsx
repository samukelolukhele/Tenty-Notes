import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/pages/login/login.css';
import Logo from '../Logo';
import Error from '../Error';
import Loading from '../Loading';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import { UseFetchTypes } from '../../hooks/types/@types.useFetch';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { colours } from '../utils/colours';

const Login = () => {
  const nav = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { handleFetchError, fetchError } = useFetch<UseFetchTypes>();

  const [error, setError] = useState({ status: false, message: 'No error' });
  const [loading, setLoading] = useState(false);

  const handleData = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setError({ status: false, message: '' });
    setLoading(true);

    if (data.password === '' || undefined || data.email === '' || undefined) {
      setError({ status: true, message: 'Fields are empty' });
      setLoading(false);
    }

    await axios
      .post('auth/login', data)
      .then((response) => {
        response.data.access_token &&
          localStorage.setItem('token', response.data.access_token);

        return window.location.reload();
      })
      .catch((err) => {
        handleFetchError(
          Number(err.response.status),
          201,
          'Failed to login',
          true,
        );
        handleFetchError(
          Number(err.response.status),
          401,
          'Login credentials are incorrect',
        );

        setLoading(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) return nav('/dashboard');
  }, []);

  return (
    <div className="login">
      <div className="container">
        <div className="login-card">
          <Logo size={2.2} />
          <div className="login-fields">
            <label>Email</label>
            <input type="email" name="email" required onChange={handleData} />
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleData}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          <button
            type="submit"
            className="login-submit btn-tetiary"
            onClick={handleSubmit}
          >
            Login
          </button>
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="register-link">
              Register here.
            </Link>
          </p>
          {loading && (
            <Circles width={40} height={40} color={colours.tetiary} />
          )}
          {fetchError.status && <Error message={fetchError.message} />}
        </div>
      </div>
    </div>
  );
};

export default Login;
