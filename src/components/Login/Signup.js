import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import './signup.css'
import bck_vg from '../../../src/veggie2.jpg';
const registerUrl = "https://edu-login-app.herokuapp.com/api/auth/register"
class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            email: '',
            message: '',
            mobile: ''

        }
        console.log(this.state)
    }
    handleSignUp = () => {
        if (!this.state.email) {
            this.setState({ showSuccessAlert: true })
            this.setState({ message: 'Please enter E-mail' })
        } else if (!this.state.username) {
            this.setState({ showSuccessAlert: true })
            this.setState({ message: 'Please enter username' })
        }else if (!this.state.password) {
            this.setState({ showSuccessAlert: true })
            this.setState({ message: 'Please enter Password' })
        }
         else {
             console.log('body to signup', JSON.stringify(this.state))
            fetch(registerUrl, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })

                .then(this.props.history.push('/Login'))
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    skip = () => {
        this.props.history.push('/')
    }
    render() {
        return (
            <Fragment>
                <body className="bg-img" style={{ backgroundImage: `url(${bck_vg})` }}>
                    <div className="container"  >
                        {this.state.showSuccessAlert &&
                            <Alert variant="filled" severity="error" id="alert"

                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            this.setState({ showSuccessAlert: false })
                                            //   setOpen(false);
                                        }}
                                    >
                                        <i class="fa fa-times" style={{ color: 'black' }}></i>
                                    </IconButton>
                                }

                            >
                                <span className="errorMsg">{this.state.message}</span>
                            </Alert>

                        }


                        <div className="thumbnail">
                            <div className="Padding">
                                <h1 id="loginHd">Sign Up</h1>
                                <p>Please fill in this form to create an account.</p>
                                <hr />


                                <div className="form-group" id="emailInp">
                                    <label>E-mail</label>
                                    <input type="text" name="email" id="email" class="form-control" value={this.state.email} onChange={this.handleChange} required />

                                </div>
                                <div class="form-group">
                                    <label>User Name</label>
                                    <input type="text" name="username" id="username" class="form-control" value={this.state.username} onChange={this.handleChange} required />

                                </div>
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="tel" name="mobile" id="mobile" class="form-control" pattern="[0-9]{10}" value={this.state.mobile} onChange={this.handleChange} required />

                                </div>

                                <div id="passwordGrp" >

                                    <div className="form-group" id="pswdInp">
                                        <label>Password</label>
                                        <input type="Password" name="password" id="password" class="form-control" value={this.state.password} onChange={this.handleChange} required />
                                    </div>

                                    {/* <div id="viewPswd">
                                        <span className="glyphicon glyphicon-eye-open" onClick="show(1);"></span>
                                    </div> */}
                                </div>
                                <div id="buttonsDiv">
                                    {/* <Button  variant="text" size="large" color="success" onClick={this.handleSignUp}>SignUp</Button> */}
                                    <button className="btn btn-success space" onClick={this.handleSignUp} >SignUp</button>
                                </div>
                                <center className="skipBtn"> <Button variant="outlined" size="large" color="info" onClick={this.skip}>Skip SignUp & go to Home</Button></center>

                            </div>
                        </div>

                    </div >

                </body>

            </Fragment >
        )

    }
}
export default Signup;