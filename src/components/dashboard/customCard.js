import React from 'react'
import { NavLink } from 'react-router-dom'
import './PaisCard.css'

export const CustomCard = ({
    name,
    image
}) => {
    return (
        <div className="card" style={{maxWidth: 500, maxHeight: 400}}>
            <div  className="row">
                <div className="col-md-1">
                </div>
                <div className="col-md-4 card-imagen ml-4">
                    <img src={`${image}`} className="card-img-top" width="360" height="140"alt = {name}></img>
                </div>
                <div className="col-md-5" >
                    <div className="card-body">
                        <h4 className="card-title" style={{ color: '#ffffff' }}>{name}</h4>
                    </div>
                </div>
                <NavLink to={`./dashDocs/${name}/EX/`} className="stretched-link"></NavLink>
            </div>
        </div>
        
    )
}
