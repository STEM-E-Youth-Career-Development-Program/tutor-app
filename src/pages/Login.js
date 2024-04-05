import { Navigate } from "react-router-dom";
import "./Login.css"
import { GoogleLogin } from '@react-oauth/google';

function Login({user, setUser}) {
    const responseMessage = (response) => {
        console.log(response);
        setUser(response)
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    return <div className="login-bigbody">
        {user && (
            <Navigate to="/dashboard" replace={true}/>
        )}

        <h1 className="login-h1">Login</h1>
        
        <div className="login-center login-container">

            <div className="login-welcome"><b>Welcome! Please Login Below:&nbsp;</b></div>
            {/*<div class= "login-button"><button>Login with Google</button></div>*/}
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>

    </div>
}

export default Login;


