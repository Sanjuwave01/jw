import React from 'react';
import { GoogleLogin } from 'react-google-login';

const CLIENT_ID = '673902641255-9efac8p4u9f3omdj84010nv190vehlje.apps.googleusercontent.com';

const GoogleAuth = ({ setToken }) => {

    const onSuccess = (response) => {
        console.log('Login Success:', response);
        setToken(response.accessToken);
    };

    const onFailure = (response) => {
        console.log('Login failed:', response);
    };

    return (
        <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            scope="https://www.googleapis.com/auth/fitness.activity.read"
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleAuth;
