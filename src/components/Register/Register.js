import React, { Component } from "react";
import 'tachyons';
import ReactLoading from 'react-loading';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputName: '',
            inputEmail: '',
            inputPassword: '',
            errorRegister: false,
            errorMessage: '',
            loading: false,
        };
    }

    onNameChange = evt => this.setState({inputName: evt.target.value});

    onEmailChange = evt => this.setState({inputEmail: evt.target.value});

    onPasswordChange = evt => this.setState({inputPassword: evt.target.value});

    onSubmitRegister = () => {
        const {inputEmail, inputPassword, inputName} = this.state;
        const { loadUser, onRouteChange } = this.props;

        this.setState({errorRegister: false, loading:true});

        fetch('https://sm-api.onrender.com/register', {
            method: 'POST', 
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: inputName,
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
                    this.setState({errorRegister: true, errorMessage:data});
                }
                this.setState({loading:false});
            })
            .catch(error => {
                console.log("error", error);
            })
    };

    render(){
        const { onRouteChange } = this.props;
        const { loading, errorRegister, errorMessage } = this.state;
        return (
            <div className="ma3">
                <article className="mw6 center br3 pa3 pa4-ns ba bw1 b--white-10 shadow-3">
                    <main className="pa4 white-80">
                        <div className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="tc f3 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Full Name</label>
                                    <input className="white-80 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="email" name="name"  id="name"
                                        onChange={this.onNameChange} />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input className="white-80 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="email" name="email-address"  id="email-address"
                                        onChange={this.onEmailChange} />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input className="white-80 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" name="password"  id="password"
                                        onChange={this.onPasswordChange} />
                                </div>
                            </fieldset>
                            {
                            loading? 
                                <ReactLoading className="center" type="bubbles" ></ReactLoading>
                                :(<div className="tc">
                                    <input onClick={this.onSubmitRegister} 
                                        className="b ph3 pv2 input-reset ba b--white white-80 bg-transparent grow pointer f6 dib" 
                                        type="submit" value="Register"/>
                                  </div>)
                            }
                            {errorRegister? (<p className="pv2 tc f6 red">{`${errorMessage}`}</p>): (<></>)}
                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange('signin')} 
                                className="mw5 center pointer tc f6 dim white">Already a user? Sign In</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}
  
export default Register;