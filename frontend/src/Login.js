import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import mainLogo from "./media/code_asthram.png";
import tarproduct from "./media/codeasthramproduct.png";
import eve from "./media/eve.gif";
import quote from "./media/caption.png";
import copy from "./media/copyright.png";

const Login = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const navigate = useNavigate(); // Use useNavigate for navigation

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  


  const login = async () => {
    try {
      const response = await axios.post('http://localhost:2000/login', {
        username: state.username,
        password: state.password,
      });
      localStorage.setItem('token', response.data.token);
      //alert('Login successful');
      navigate('/dashboard'); // Navigate to the dashboard upon successful login
    } catch (error) {
      console.error('Login error', error);
      alert('Login failed');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="whole" style={{ height: '100vh', width: '100%' }}>
      <div className="container">
        <div className="screen" style={{ borderRadius: '20px' }}>
          <div className="screen__content">
            <img src={mainLogo} style={{ height: "50px", width: "200px", position: "relative", top: "120px", left: "15px" }} alt="Logo" />
            <form className="login">
              <div className="login__field">
                <FaUserAlt className="login__icon" style={{ fontSize: '24px' }} />
                <TextField
                  id="username"
                  type="text"
                  autoComplete="off"
                  name="username"
                  value={state.username}
                  onChange={onChange}
                  placeholder="User Name / Email"
                  required
                  InputProps={{
                    style: { fontSize: 16, size: 50, left: '28px' },
                  }}
                />
              </div>
              <div className="login__field">
                <FaLock className="login__icon" style={{ fontSize: '24px' }} />
                <TextField
                  id="password"
                  type={state.showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  name="password"
                  value={state.password}
                  onChange={onChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Password"
                  required
                  InputProps={{
                    style: { fontSize: 16, size: 50, left: '28px' },
                    endAdornment: (
                      <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                        {state.showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    ),
                  }}
                />
              </div>
              <Button
                className="login__submit"
                variant="contained"
                size="small"
                onClick={login}
                style={{ fontSize: "16px", fontWeight: 'bolder', color: 'black', borderRadius: '40px' }}
              >
                <span className="button__text">Log In</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </Button>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
        <div className="rightbody" style={{ display: 'flex', height: '100vh', width: '850px', position: 'absolute', left: '400px' }}>
          <div className="tarcin-product" style={{ display: 'flex', position: 'absolute', right: '0', top: '10%' }}>
            <img
              src={tarproduct}
              style={{ height: '400px', width: '800px', transition: 'transform 0.2s', cursor: 'pointer' }}
              alt="tarproduct"
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>
          <div className="tarcin-quote" style={{ display: 'flex', position: 'absolute', right: '5%', top: '35%' }}>
            <img
              src={quote}
              style={{ height: '300px', width: '700px', transition: 'transform 0.2s', cursor: 'pointer' }}
              alt="quote"
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>
          <div className="eva-gif" style={{ position: 'absolute', display: 'flex', right: '0' }}>
            <img src={eve} style={{ height: '150px', width: '150px' }} alt="eva gif" />
          </div>
          <footer style={{ position: 'absolute', bottom: '20%', left: '30%', display: 'flex' }}>
            <img
              src={copy}
              style={{ height: '150px', width: '350px', transition: 'transform 0.2s', cursor: 'pointer' }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              alt="copyright"
            />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
