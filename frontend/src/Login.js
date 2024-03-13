import React, { useState } from "react";
import swal from "sweetalert";
import { Button, TextField } from "@material-ui/core";
import { withRouter } from "./utils";
import { useLocation } from "react-router-dom";
import axios from "axios";
import mainLogo from "./media/code_asthram.png";
import tarproduct from "./media/codeasthramproduct.png";
import eve from "./media/eve.gif";
import quote from "./media/caption.png";
import copy from "./media/copyright.png";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = (props) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  //Define setIsSuperuser state 
  const [isSuperuser, setIsSuperuser] = useState(false);

  const [state, setState] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const login = () => {
    console.log('Login state:', state);
    axios.post('https://code.tarcinrobotic.in/login', {
      username: state.username,
      password: state.password,
    })
      .then(response => {
        // Handle the successful response from the server
        console.log('Login successful:', response.data);
  
        // Assuming the server sends a token, you might want to store it in local storage
        const token = response.data.token; // Capture the token from the response
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', response.data.id);
  
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
        // Assuming the server sends information about whether the user is a superuser
        const isSuperuser = response.data.isSuperuser;
        console.log('isSuperuser:', isSuperuser);
  
        // Set the isSuperuser state
        setIsSuperuser(isSuperuser);
  
        // Check if the user is a superuser before making the /register request
        if (isSuperuser) {
          const superuserData = {
            username: 'admin@tarcin.com',
            password: 'tarcin301'
          };
          setIsSuperuser(true);
  
          // Make a request to /register with the token
          axios.post('http://localhost:3000/register', superuserData, {
            headers: {
              token: token, // Use the captured token here
            },
          })
            .then(registerResponse => {
              // Handle the response from the /register route
              console.log('Registration successful:', registerResponse.data);
            })
            .catch(registerError => {
              // Handle errors from the /register route
              console.error('Registration error:', registerError);
            });
        }
  
        // Redirect the user to the dashboard or do other actions upon successful login
        props.navigate("/dashboard");
      })
      .catch(error => {
        // Handle errors from the server or network issues
        console.error('Login error:', error);
  
        if (error.response && error.response.data && error.response.data.errorMessage) {
          // Display an error message to the user
          swal("Login Failed", error.response.data.errorMessage, "error");
        } else {
          // Display a generic error message
          swal("Login Failed", "An error occurred during login.", "error");
        }
      });
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default form submission
      login();
    }
  };

    return (
      <div className="whole" style={{height: '100vh', width: '100%' }}>
    <div className="container" >
      <div className="screen" style={{borderRadius: '20px'}}>
        <div className="screen__content" >
          <img src={mainLogo} style={{ height: "50px", width: "200px", position: "relative", top: "120px", left: "15px" }} alt="Logo" />
          <form className="login">
            <div className="login__field" >
            <FaUserAlt className="login__icon" style={{ fontSize: '24px' }} />
              <TextField
                id="standard-basic"
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
                id="standard-basic"
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
              style={{ fontSize: "16px", fontWeight: 'bolder', Color: 'black', borderRadius:'40px' }}
            >
              <span className="button__text">Log In</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </Button>
           {/*} <button
              className="register__submit"
              component="button"
              onClick={() => {
                this.props.navigate("/register");
              }}
            >
              <span className="button__text">Register</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button> */}
          </form>
        {/*  <div className="social-login">
             Add your social login components here 
          </div>*/}
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
      <div className="rightbody" >
          <div className="tarcin-product" >
            <img
              src={tarproduct}
              
              alt="tarproduct"
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>
          <div className="tarcin-quote" >
            <img
              src={quote}
              
              alt="quote"
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>

          <div className="eva-gif" >
            <img src={eve}  />
          </div>

          <footer >
            <img
              src={copy}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
          </footer>
        </div>
      </div>
    </div>
    );
  };

export default withRouter(Login);