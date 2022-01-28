import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getCountries } from '../../actions/countries';
import { useForm } from '../../hooks/useForm';
import { GetCountryByName } from '../../selectors/getCountryByName';
import { PaisCard } from '../pais/PaisCard';
const queryString = require('query-string');



export const SearchScreen = ({history}) => {

    const location = useLocation();
    const {q=''} = queryString.parse(location.search)
    
    const [formValues, handleInputChange] = useForm({
        searchByName:q
    });
    const {searchByName} = formValues;


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])
    
    let paisesFilter = useSelector(state => state.paises.paises);
    paisesFilter = useMemo(() => GetCountryByName( paisesFilter, searchByName ), [searchByName])


    const handleSearch = (e) =>{
        e.preventDefault();
        history.push(`?q=${searchByName}`);
    }
    return (
        <div className="container-fluid  animate__animated animate__fadeIn mt-2">
            <hr />
            <h1 className="text-center" style={{ color: '#ffffff' }}>SEARCH</h1>
            <hr />

            <div className="row ">
                <div className="col-4">
                    <h4 style={{ color: '#ffffff' }}>Search by name</h4>
                    <hr />  

                    <form onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            placeholder="Country" 
                            className="form-control" 
                            name="searchByName"
                            autoComplete="off"
                            value={searchByName}
                            onChange={handleInputChange}
                        ></input>
                        <button type="submit" className="btn mt-2 btn-block btn-outline-primary">Search...</button>
                    </form>
                </div>
                <div className="col-8">
                    <h4 style={{ color: '#ffffff' }}>Results</h4>
                    <hr />
                    {(searchByName==="")
                        &&
                        <div className="alert alert-primary">
                            Please do a search
                        </div>
                    }
                    {
                        (paisesFilter.length === 0 && searchByName!=="")
                        &&
                        <div className="alert alert-danger">
                            No matches found with {searchByName}
                        </div>
                    }
                    {
                        paisesFilter.map(pais =>(
                            <PaisCard 
                                key={pais.name}
                                {...pais}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
