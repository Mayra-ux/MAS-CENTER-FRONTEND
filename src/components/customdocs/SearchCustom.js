import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { GetCountryByName } from '../../selectors/getCountryByName';
import { GetCustoms } from '../../selectors/getCustoms';
import { CustomCard } from './customCard';
const queryString = require('query-string');



export const SearchCustom = ({history}) => {

    const location = useLocation();
    const {q=''} = queryString.parse(location.search)
    
    const [formValues, handleInputChange] = useForm({
        searchByName:q
    });
    const {searchByName} = formValues;

    GetCustoms();
    let cd =  useSelector(state => state.custom.customs);
    let cd2 =  useSelector(state => state.custom.customs);
    console.log(cd);
    console.log(searchByName);
    
    cd = useMemo(() => GetCountryByName( cd, searchByName ), [searchByName])
    


    const handleSearch = (e) =>{
        e.preventDefault();
        history.push(`?q=${searchByName}`);
    }
    return (
        <div className="container-fluid  animate__animated animate__fadeIn mt-2">
            <hr />
            <h1 className="text-center" style={{ color: '#ffffff' }}>CUSTOM DOCUMENTS</h1>
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
                    {  (searchByName==="")
                    &&
                        cd2.map(custom =>(
                            <CustomCard 
                                key={custom.name}
                                {...custom}
                            />
                        ))
                    }
                    {
                        (cd.length === 0 && searchByName!=="")
                        &&
                        <div className="alert alert-danger">
                            No matches found with {searchByName}
                        </div>
                    }
                    {
                        cd.map(custom =>(
                            <CustomCard 
                                key={custom.name}
                                {...custom}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
