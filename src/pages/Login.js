import "./Login.css"
import { GoogleLogin } from '@react-oauth/google';

function Login() {
    const responseMessage = (response) => {
      console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    return <div class="login-bigbody">
        <h1 class="login-h1">Login</h1>
        
        <div class="login-center login-container">

            <div class="login-welcome"><b>Welcome! Please Login Below:&nbsp;</b></div>
            {/*<div class= "login-button"><button>Login with Google</button></div>*/}
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>

    </div>
}

export default Login;


