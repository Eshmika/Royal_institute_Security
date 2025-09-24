import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './Login.css';
import loginimg from './photos/studentlogin.png';
import logofull from './photos/logofull.png';

// Minimal ID token decoder (no signature verification; server verifies)
function decodeJwt(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

export default function GoogleStudentSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const credential = location?.state?.credential || '';
  const payload = useMemo(() => decodeJwt(credential), [credential]);
  const email = payload?.email || '';
  const name = payload?.name || '';

  const [form, setForm] = useState({
    grade: '',
    username: email ? email.split('@')[0] : '',
    contactnumber: ''
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!credential) {
      toast.error('Missing Google credential. Please start again.');
      navigate('/login');
      return;
    }
    const { grade, username, contactnumber } = form;
    try {
      const { data } = await axios.post('/google-signup', { credential, grade, username, contactnumber });
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      toast.success('Signed up successfully');
      navigate('/studentdashboard');
    } catch (err) {
      const msg = err?.response?.data?.error || 'Google Sign-Up failed';
      toast.error(msg);
    }
  };

  return (
    <main>
      <div className="mainlogin">
        <div className="loginphoto">
          <img src={loginimg} alt='loginimage' className='loginimg' />
        </div>
        <div className="login">
          <img src={logofull} alt='loginimage' />
          <p className="wel">Welcome to Royal Academy</p>
          <form onSubmit={onSubmit}>
            <div className="username">
              <label className="logintxt">Google Name</label><br/>
              <input type="text" className="loginbox" value={name} readOnly />
            </div>
            <div className="username">
              <label className="logintxt">Google Email</label><br/>
              <input type="email" className="loginbox" value={email} readOnly />
            </div>
            <div className="username">
              <label className="logintxt">GRADE</label><br/>
              <select className="loginbox" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })}>
                <option value="">Select Grade</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
              </select>
            </div>
            <div className="username">
              <label className="logintxt">USERNAME</label><br/>
              <input type="text" className="loginbox" placeholder="Choose a username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            </div>
            <div className="username">
              <label className="logintxt">CONTACT NUMBER (optional)</label><br/>
              <input type="tel" className="loginbox" placeholder="Enter your contact number" value={form.contactnumber} onChange={(e) => setForm({ ...form, contactnumber: e.target.value })} />
            </div>
            <br/>
            <button type="submit" className='btnloging'>Create Account</button>
            <a href='/login'><p className="register">Already have an Account? <b>Log IN</b></p></a>
          </form>
        </div>
      </div>
    </main>
  );
}
