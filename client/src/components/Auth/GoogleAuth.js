import React from 'react'

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onGoogleSuccess = async (credentialResponse) => {
        const result = credentialResponse?.profileObj;
        const token = credentialResponse?.tokenId               // clientId

            try {
                  dispatch({ type: 'AUTH', data: { result, token } });

                  navigate('/')
                } catch (error) {
                  console.log(error);
                }
                console.log(credentialResponse);
    }

    const onGoogleFailure = () => {
        console.log('Login Failed');
    }

    // const onSignIn = (googleUser) => {
    //   let profile = googleUser.getBasicProfile();
    //   console.log('ID: ' + profile.getId());
    //   console.log('Name: ' + profile.getName());
    //   console.log('Image URL: ' + profile.getImageUrl());
    //   console.log('Email: ' + profile.getEmail());
    // }

    // const signOut = () => {
    //   let auth2 = gapi.auth2.getAuthInstance();
    //   auth2.signOut().then(() => {
    //     console.log('user signed out');
    //   })
    // }

    // const responseGoogle = (response) => {
    //   localStorage.setItem('user', JSON.stringify(response.profileObj));
    //   const { name, googleId, imageUrl } = response.profileObj;
    //   const doc = {
    //     _id: googleId,
    //     _type: 'user',
    //     userName: name,
    //     image: imageUrl,
    //   };
    //   client.createIfNotExists(doc).then(() => {
    //     navigate('/', { replace: true });
    //   });
    // };
  

  return (
    <GoogleOAuthProvider
      clientId="501220277020-hktlmvasqruvv133o9jh1frk5co52c1h.apps.googleusercontent.com"
      src="https://apis.google.com/js/platform.js" async defer>
        <GoogleLogin
          onSuccess={onGoogleSuccess}
          onError={onGoogleFailure}
          cookiePolicy="single_host_origin"
        />
    </GoogleOAuthProvider>
  )
}

export default GoogleAuth