import { Component } from "react";
// import Login from "../../../components/Authentication/Login/Login";
import LoginForm from "../../../components/forms/login/login";
import AuthenticationTop from "../../../components/NavBar/topNav/signupTop";

class UserLogin extends Component{
    render(){
        return(
            <div>
                <main className="main-content  mt-0">
                    {/*<Login/>*/}
                    <LoginForm/>
                </main>
            </div>
        )
    }
}

export default UserLogin