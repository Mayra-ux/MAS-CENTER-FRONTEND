import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from '../../actions/countries';
import { PaisCard } from './PaisCard';
import './login.css';

export const PaisList = () =>{
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])
    console.log("Carlos");
    const paises = useSelector(state => state.paises.paises);
    console.log(paises)
    document.body.style.backgroundColor = "#283040";
    return(
        <div className="card-columns container-fluid animate__animated animate__fadeIn mt-5 ml-2">
            {
                paises.map(pais =>(
                    <PaisCard key={paises.name}
                        {...pais}
                    />
                ))

            }
            
        </div>
    )
}

