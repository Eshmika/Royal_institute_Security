import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import './Login.css';
import loginimg from './photos/studentlogin.png'
import logofull from './photos/logofull.png'
import axios from 'axios'

function StudentLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const loginStudent = async (e) => {
    e.preventDefault();
    const { username, password } = data;
    try {
      const {data} = await axios.post('/login', {username, password});
      if(data.error){
        toast.error(data.error);
      }else{
        // Keep controlled inputs in a valid state
        setData({ username: '', password: '' });
        navigate('/studentdashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  // Google Sign-In setup (load GIS script dynamically)
  useEffect(() => {
    const clientId = (process.env.REACT_APP_GOOGLE_CLIENT_ID || '').trim();
    if (!clientId) return;

    const initialize = () => {
      try {
        // @ts-ignore - google global injected by GIS script
        if (!window.google?.accounts?.id) return;
        // @ts-ignore
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            try {
              const { data: resp } = await axios.post('/google-login', { credential: response.credential });
              if (resp?.error) {
                // If the error indicates no account, redirect to Google signup onboarding
                if (resp.error.toLowerCase().includes('no student') || resp.error.toLowerCase().includes('register')) {
                  navigate('/google-signup', { state: { credential: response.credential } });
                  return;
                }
                toast.error(resp.error);
                return;
              }
              navigate('/studentdashboard');
            } catch (err) {
              console.error(err);
              // Surface server-provided error message when available (e.g., 404 when student not found)
              const serverMsg = (err && err.response && err.response.data && err.response.data.error) ? err.response.data.error : null;
              if (serverMsg && (serverMsg.toLowerCase().includes('no student') || serverMsg.toLowerCase().includes('register'))) {
                navigate('/google-signup', { state: { credential: response.credential } });
              } else {
                toast.error(serverMsg || 'Google Sign-In failed');
              }
            }
          },
          context: 'signin',
          auto_select: false
        });
        // @ts-ignore
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInDiv'),
          { theme: 'outline', size: 'large', shape: 'rectangular', width: 320 }
        );
      } catch (e) {
        console.error(e);
      }
    };

    // If script already loaded, just initialize
    // @ts-ignore
    if (window.google?.accounts?.id) {
      initialize();
      return;
    }

    // Inject the GIS script dynamically
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initialize;
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script tag to avoid duplicates when navigating back
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [navigate]);
  return (
    <main>
      <div class="mainlogin">
        <div class="loginphoto">
          <img src={loginimg} alt='loginimage' class='loginimg' />
        </div>
        <div class="login">
          <img src={logofull} alt='loginimage' />
          <p class="wel">Welcome to Royal Academy</p>
          <form onSubmit={loginStudent}>
            <div class="username">
              <label for="username" class="logintxt">USERNAME</label><br/>
              <input type="text" id="username" name="username" placeholder="Enter your username" class="loginbox" value={data.username} onChange={(e) => setData({...data, username: e.target.value})} />
                       
            </div>    
            <div class="username">
              <label for="password" class="logintxt">PASSWORD</label><br/>
              <input type="password" id="password" name="password" placeholder="Enter your password" class="loginbox" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
            </div>           
            <a href='/studentforgetpassword'><p class="forget">Forgot Password?<br/></p></a>          
            <button type="submit" className='btnloging'>LOGIN</button>
            <div style={{ marginTop: '10px', width: '81%', display: 'flex', justifyContent: 'center' }}>
              <div id="googleSignInDiv" />
            </div>
            <a href='/register'><p class="register">New Student? <b>REGISTER</b></p></a>
          </form>
        </div>
      </div>
      
    </main>
  )
}

export default StudentLogin
