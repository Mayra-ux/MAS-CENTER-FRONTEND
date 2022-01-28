import React from 'react'
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { startRegister } from '../../actions/auth';
import { NavLink } from 'react-router-dom'
import "./style.css"

export const NewUser = () => {

    const dispatch = useDispatch();
    const { role } = useSelector( state => state.auth );
    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: null,
        rEmail: null,
        rPassword1: null,
        rPassword2: null,
        rRole:null,
    });

    let { rName, rEmail, rPassword1, rPassword2, rRole } = formRegisterValues;
    
    const handleRegister = ( e ) => {
        e.preventDefault();

        if ( rPassword1 !== rPassword2 ) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales','error');
        }
        if(rRole === "" || rRole === null){
            rRole = "Agente"
        }
        console.log( rEmail, rPassword1, rName, rRole)
        dispatch( startRegister( rEmail, rPassword1, rName, rRole ) );
    }

    return (
        <div className="container login-container mt-0 mx-auto">
            <hr />
            <div className="container-fliud center text-center">

              
                
                {(role==="Admin")&&
                    <div>
                        <h1 className="text-center" style={{ color: '#000' }}>USERS</h1>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-secondary">
                                <NavLink to={`../../users`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a'}}><i class="fas fa-undo-alt"></i> Back</NavLink>
                            </button>
                        </div>
                    </div>
                }
                {(role==="Agente" || role==="AgenteDB" || role==="RH" || role==="CoordQA" || role==="CoordDB" || role==="CoordCD" || role==="PD Admin")&& // añadiendo rol PD ADMIN
                    <div>
                        <h1 className="text-center" style={{ color: '#000' }}>Access Denied</h1>
                    </div>
                }
                <hr />

            </div>
            {(role==="Admin" )&&
<div className="container login-container col login-form-1 mt-0">
                    <h3 style={{ color: '#283040' }}>Create account</h3>
                    <form onSubmit={ handleRegister }>
                    <p>Name:</p>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control "
                                placeholder="Name"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <p>Email:</p>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control campo1"
                                placeholder="Email"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <p>Role:</p>
                        <div className="form-group"> 
                            <select className="form-control form-select" 
                                aria-label="Default select example"
                                name="rRole"
                                value={ rRole }
                                onChange={ handleRegisterInputChange }>
                                    <option value="Agente">Agente</option>
                                    <option value="AgenteDB">Agente DB</option>
                                    <option value="CoordQA">Coord. QA</option>
                                    <option value="CoordDB">Coord. DB</option>
                                    <option value="rh">RH</option>
                                    <option value="Admin">Admin</option>
                                    <option value="PD Admin">PD Admin</option>
                            </select>
                        </div>
                        <p>Password:</p>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                                name="rPassword1"
                                value={ rPassword1 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <p>Confirm password:</p>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Comfirm Password" 
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Save" />
                        </div>
                    </form>
            </div>
            }
            
        </div>
    )
}
