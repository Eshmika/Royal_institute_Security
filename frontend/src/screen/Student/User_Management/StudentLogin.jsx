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
        setData({});
        navigate('/studentdashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  // Google Sign-In setup
  useEffect(() => {
    /* global google */
  const clientId = (process.env.REACT_APP_GOOGLE_CLIENT_ID || '').trim();
    if (!window.google || !clientId) return;
    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          try {
            const { data: resp } = await axios.post('/google-login', { credential: response.credential });
            if (resp?.error) {
              toast.error(resp.error);
              return;
            }
            navigate('/studentdashboard');
          } catch (err) {
            console.error(err);
            toast.error('Google Sign-In failed');
          }
        },
        context: 'signin',
        auto_select: false
      });
      // Render button
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInDiv'),
        { theme: 'outline', size: 'large', shape: 'rectangular', width: 320 }
      );
    } catch (e) {
      console.error(e);
    }
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
