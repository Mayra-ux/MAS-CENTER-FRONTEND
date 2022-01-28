import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {NavLink } from 'react-router-dom'
import { startLogout } from '../../actions/auth';
import './navbar.css'
import { uiOpenModalBug } from '../../actions/ui';
import { EditModal } from './EditModal';
import Dropdown from 'react-bootstrap/Dropdown';

export const Navbar = () => {

    const dispatch = useDispatch();
    const { role, name } = useSelector( state => state.auth );

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    const handleSearch = (e) =>{
        e.preventDefault();
        dispatch(uiOpenModalBug());
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark color-nav">
            <a className="navbar-brand" href="/">
                <img src='https://mas.getmati.com/static/media/mati-logo-white.f435e16c.svg'width="60%" height="60%" alt="CAYS" />
            </a>
            <div className="navbar-collapse align-middle">
                <div className="navbar-nav align-items-center">
                    <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/blog">
                        Blog
                    </NavLink>
                    <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/docs">
                        Docs
                    </NavLink>
                    <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/sr/AD">
                        General
                    </NavLink>
                    <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/search">
                        Search
                    </NavLink>
                    <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/custom">
                        Custom Doc.
                    </NavLink>
                    {
                        (role==="Admin" || role==="CoordDB" || role==="AgenteDB")&&
                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/dashboard">
                            Dashboard
                        </NavLink>
                    }
                    {
                        (role==="CoordQA")&&
                        <Dropdown>
                            <Dropdown.Toggle style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040'}}>
                                QA Admin
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1"  to="/adminDoc" style={{ color: '#283040'}}>
                                    Docs (Admin)
                                </NavLink>
                                <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/adminSr" style={{ color: '#283040'}}>
                                    General (Admin)
                                </NavLink>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                     {
                        (role==="PD Admin")&& //ROL TEMPORAL by mayra
                        <Dropdown>
                            <Dropdown.Toggle style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040'}}>
                                PD Admin
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/AdminBlog" style={{ color: '#283040'}}>
                                    General (Admin)
                                </NavLink>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    {
                        (role==="CoordDB")&&                  
                        <Dropdown>
                            <Dropdown.Toggle style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040'}}>
                                DB Admin
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/AdminDash" style={{ color: '#283040'}}>
                                    Dashboard (Admin)
                                </NavLink>
                                <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/adminDashDoc" style={{ color: '#283040'}}>
                                    Dashboard Docs (Admin)
                                </NavLink>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    {
                        (role==="CoordCD")&&
                        <Dropdown>
                            <Dropdown.Toggle style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040'}}>
                                C.D. Admin
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/AdminCustom" style={{ color: '#283040'}}>
                                    C.D. (Admin)
                                </NavLink>
                                <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/adminCustomDoc" style={{ color: '#283040'}}>
                                    Documents (Admin)
                                </NavLink>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    {
                        (role==="Admin")&&
                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/checker">
                            MasChecker
                        </NavLink>
                        
                    }
                    {
                        (role==="Payroll")&&
                        <Dropdown>
                            <Dropdown.Toggle style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040'}}>
                                Payroll
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ color:'#BFCBC6', background: '#283040', borderColor: '#fff'}}>
                                <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/overtimes" style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040'}}>
                                    Overtimes
                                </NavLink>  
                                <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/hrspay" style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040'}}>
                                    Hours to pay
                                </NavLink>   
                            </Dropdown.Menu>
                        </Dropdown>
                        
                    }
                    {
                        (role==="Admin")&&
                        <Dropdown>
                            <Dropdown.Toggle style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040'}}>
                                Admin
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ color:'#BFCBC6', background: '#283040', borderColor: '#fff'}}>
                                <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/users" style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040'}}>
                                    Users (Admin)
                                </NavLink>
                                <Dropdown>
                                    <Dropdown.Toggle style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040', width: '100%'}}>
                                        C.D. Admin
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/AdminCustom" style={{ color: '#283040'}}>
                                            C.D. (Admin)
                                        </NavLink>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/adminCustomDoc" style={{ color: '#283040'}}>
                                            Documents (Admin)
                                        </NavLink>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040', width: '100%'}}>
                                        D.B. Admin
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/AdminDash" style={{ color: '#283040'}}>
                                            Dashboard (Admin)
                                        </NavLink>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/adminDashDoc" style={{ color: '#283040'}}>
                                            Dashboard Docs (Admin)
                                        </NavLink>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040', width: '100%'}}>
                                        Q.A. Admin
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1"  to="/adminDoc" style={{ color: '#283040'}}>
                                            Docs (Admin)
                                        </NavLink>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/adminSr" style={{ color: '#283040'}}>
                                            General (Admin)
                                        </NavLink>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {/* add by Mayra */}
                                <Dropdown>
                                    <Dropdown.Toggle  style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040', width: '100%'}}>
                                        P.D. Admin
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/CardsAdmin" style={{ color: '#283040'}}>
                                            Cards (Admin)
                                        </NavLink>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/CarouselAdmin" style={{ color: '#283040'}}>
                                            Carrusel (Admin)
                                        </NavLink>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/ErizoAdmin" style={{ color: '#283040'}}>
                                            Erizo (Admin)
                                        </NavLink>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/SpecialRulesAdmin" style={{ color: '#283040'}}>
                                            Reglas Especiales(Admin)
                                        </NavLink>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/ObsoleteRulesAdmin" style={{ color: '#283040'}}>
                                            Reglas Obsoletas (Admin)
                                        </NavLink>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/MemesAdmin" style={{ color: '#283040'}}>
                                            Memes (Admin)
                                        </NavLink>
                                    </Dropdown.Menu>    
                                </Dropdown>
                                {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
                                <Dropdown>
                                    <Dropdown.Toggle style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040',  width: '100%'}}>
                                        Payroll
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ color:'#BFCBC6', background: '#283040', borderColor: '#fff'}}>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/overtimes" style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040'}}>
                                            Overtimes
                                        </NavLink>  
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/hrspay" style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040'}}>
                                            Hours to pay
                                        </NavLink>   
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040',  width: '100%'}}>
                                        RRHH
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ color:'#BFCBC6', background: '#283040', borderColor: '#fff'}}>
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/checkerAlert" style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040'}}>
                                            Checker alerts
                                        </NavLink>  
                                        <NavLink  activeClassName="active" className="nav-item nav-link text-center ml-1" to="/incidents" style={{ color:'#BFCBC6', background: '#283040', borderColor: '#283040'}}>
                                            Incidents
                                        </NavLink>   
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                </div>
            </div>
            <span className="navbar-brand">
                Welcome { name }
            </span>
                
            <button 
                className="btn btn-outline-danger"
                onClick={ handleLogout }>
                <i className="fas fa-sign-out-alt"></i>
                <span> Logout</span>
            </button>
            <form onSubmit={handleSearch}>
                    <button type="submit" className="ml-3 btn " style={{color: 'purple'}}><i className="fas fa-bug"></i></button>
            </form>
            <EditModal />
        </nav>
        
    )
}