import React from 'react';
import { PaisList } from './PaisList';

export const PaisesScreen = () =>{
    document.body.style.backgroundColor = "#283040";
    return(
        <div className="offset-md-0 mt-3">
            <hr />
            <h1 className="text-center" style={{ color: '#ffffff' }}>
                COUNTRIES
            </h1>
            <hr />
            {<PaisList />}
        </div>
    )
}