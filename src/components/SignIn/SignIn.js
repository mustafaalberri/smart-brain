import React, { Component } from "react";
import 'tachyons';
import ReactLoading from 'react-loading';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputEmail: '',
            inputPassword: '',
            errorSignIn: false,
            errorMessage: '',
            loading: false,
        };
    }

    onEmailChange = evt => this.setState({inputEmail: evt.target.value});

    onPasswordChange = evt => this.setState({inputPassword: evt.target.value});

    onSubmitSignIn = () => {
        const { inputEmail, inputPassword } = this.state;
        const { loadUser, onRouteChange } = this.props;

        this.setState({errorSignIn:false, loading:true})

        fetch('https://sm-api.onrender.com/signin', {
            method: 'POST', 
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: inputEmail,
                password: inputPassword,
            }), 
        })
            .then(response => response.json())
            .then(data => {
                if (data.id){
                    loadUser(data);
                    onRouteChange('home'); 
                }else{
                    this.setState({errorSignIn: true, errorMessage:data});
                }
                this.setState({loading:false});
            })
            .catch(error => {
                console.log('error', error);
            })
    };

    render(){
        const { onRouteChange } = this.props;
        const { loading, errorSignIn, errorMessage } = this.state;
        return (
            <div className="ma3">
                <article className="mw6 center br3 pa3 pa4-ns ba bw1 b--white-10 shadow-3">
                    <main className="pa4 white-80">
                        <div className="measure center">
                            <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
                                <legend className="tc f3 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="signin-email">Email</label>
                                    <input className="pa2 input-reset ba white-80 bg-transparent hover-bg-black hover-white w-100" 
                                        type="email" name="email-address"  id="signin-email"
                                        onChange = {this.onEmailChange} />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="signin-password">Password</label>
                                    <input className="b pa2 input-reset ba white-80 bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" name="password"  id="signin-password"
                                        onChange = {this.onPasswordChange} />
                                </div>
                                {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                            </fieldset>
                            {loading? 
                                <ReactLoading className="center" type="bubbles" ></ReactLoading>
                                :(<div className="tc">
                                        <input onClick={this.onSubmitSignIn} 
                                            className="b ph3 pv2 mv2 input-reset ba b--white white-80 bg-transparent grow pointer f6 dib" 
                                            type="submit" value="Sign in"/>
                                    </div>)}
                            {errorSignIn? (<p className="pv2 tc f6 red">{`${errorMessage}`}</p>): (<></>)}
                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange('register')} 
                                className="mw5 center pointer tc f6 dim white" >Not a user? Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}
  
export default SignIn;
