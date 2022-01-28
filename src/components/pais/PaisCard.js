import React from 'react'
import { NavLink } from 'react-router-dom'
import './PaisCard.css'

export const PaisCard = ({
    _id,
    name,
    code,
    flag
}) => {
    return (
        <div className="card ml-4" style={{maxWidth: 400, maxHeight: 400}}>
            <div  className="row">
                <div className="col-xl-5 card-imagen ml-4">
                    <img src={`${flag}`} className="card-img-top" width="180" height="90"alt = {code}></img>
                </div>
                <div className="col-xl-6" >
                    <div className="card-body">
                        <h5 className="card-title" style={{ color: '#ffffff' }}>{name}</h5>
                        <h5 className="card-title" style={{ color: '#ffffff' }}>Code: {code}</h5>
    
                    </div>
                </div>
                <NavLink to={`./pais/${name}/NI/`} className="stretched-link"></NavLink>
            </div>
        </div>
        
    )
}
