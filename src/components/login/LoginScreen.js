import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = ({history}) =>{

    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        lEmail: '',
        lPassword:''
    } );

    const {lEmail, lPassword} = formLoginValues;
    
    const handleLogin = (e) =>{
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    }

    return(
        <div className="fondo kenburns-wrap">
            <div class="kenburns-wrap">
                <img src="https://c.wallhere.com/photos/43/ac/1920x1200_px_digital_art_Firefox_Nightly_forest_Horizon_illustration_landscape_minimalism-1421513.jpg!d" class="kenburns" />
            </div>
            <div className="container ">
                <div className="login-container row  justify-content-md-center align-items-center">
                    <div className="col-md-5 login-form-2 camposlogin">
                        <form onSubmit={ handleLogin}>
                            <div className="form-group matilogo animate__animated animate__fadeInUp  ">
                                <img className=" animate__heartBeat" src="./mati.png" alt="CAYS" width="200" height="180"/>
                            </div>
                            <div className="form-group">
                                <input 
                                    style={{textDecorationColor:'#fff00'}}
                                    type="text"
                                    className="form-control bg-transparent"
                                    placeholder="Email@mati.io"
                                    name= "lEmail"
                                    value= {lEmail}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    style={{textDecorationColor:'#555555'}}
                                    type="password"
                                    className="form-control bg-transparent"
                                    placeholder="Password"
                                    name= "lPassword"
                                    value= {lPassword}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="submit"
                                    className="btnSubmit "
                                    value="Login" 
                                />
                            </div>
                        </form>
                    </div>
                    <div className="col-md-auto matiname">
                        <div className=" animate__animated animate__fadeInRight  ">
                            <img className="ml-4 MAS" src="./pixlr-bg-result (2).png"  width="300" height="200"/>
                            <h3 className="MAS ml-2">Manual Annotation System</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>     
    )
}