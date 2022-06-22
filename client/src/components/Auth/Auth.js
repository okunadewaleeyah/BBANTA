import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { signin, signup } from '../../actions/auth';

const initalState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setformData] = useState(initalState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) => {
      e.preventDefault()
      
      if(isSignup) {
        dispatch(signup(formData, navigate))
      } else {
        dispatch(signin(formData, navigate))
      }
    }

    const handleChange = (e) => {
      setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
      setShowPassword(false);
    }

    const onGoogleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId               // clientId

          try {
                dispatch({ type: 'AUTH', data: { result, token } });

                navigate('/')
              } catch (error) {
                console.log(error);
              }
              console.log(res);
  }

  const onGoogleFailure = (error) => {
    console.log(error);
      console.log('Login Failed');
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Adress" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleOAuthProvider
            clientId="501220277020-hktlmvasqruvv133o9jh1frk5co52c1h.apps.googleusercontent.com"
            src="https://apis.google.com/js/platform.js" async defer>
              <GoogleLogin
                onSuccess={onGoogleSuccess}
                onError={onGoogleFailure}
                cookiePolicy="single_host_origin"
              />
          </GoogleOAuthProvider>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
              
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth

// 501220277020-6cjmcali412ohum16gdi34povv9rrhr5.apps.googleusercontent.com