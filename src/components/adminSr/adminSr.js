import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {  docSetActive, getCountries, srDelete } from '../../actions/countries';
import { uiOpenModalDoc } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { GetSRByType } from '../../selectors/getSRByType';
import { EditModal } from './EditModal';
export const AdminSr = () => {
    const { role } = useSelector( state => state.auth );

    const [formValues2, handleInputChange2] = useForm();

    const {type} = formValues2;

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])

    GetSRByType();   
    let docs =[] 
    let docsF = useSelector(state => state.paises.sr);

    const handleSearch2 = (e) =>{
        e.preventDefault();
    } 


    const handleUpdate = (e) =>{
        const temp =JSON.parse(e.target.value); 
        console.log(temp);
        dispatch(docSetActive(temp));
        dispatch(uiOpenModalDoc());
    }   
    const handleNew= (e) =>{
        console.log("Nuevo");
        dispatch(docSetActive(null));
        dispatch(uiOpenModalDoc());
    }
    const handleDelete = (e) =>{
        const temp =JSON.parse(e.target.value); 
        console.log(temp);
        Swal.fire({
            title: 'Are you sure to delete this doc?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(srDelete(temp.id));
            }
          })
    }    
    if(type !== undefined){
        try {
            docs = docsF.filter(doc=> doc.type === type);
        } catch (error) {
            console.log("Error")
        }
    }
    console.log(type);
    return (
        <>
        <div>
        <hr />
            <div className="container-fliud center text-center">
                {(role==="Admin" || role==="CoordQA")&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>GENERAL RULES</h1>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-success"  onClick={handleNew}>
                                <i className="fas fa-file-image"></i> New rule
                            </button>
                        </div>
                    </div>
                }
                {(role==='Agente' || role==='AgenteDB'|| role==='CoordDB' || role==='RH')&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>Access Denied</h1>
                    </div>
                }
                <hr />
                {(role ==="Admin" || role==="CoordQA")&&
                <div className="container-fluid  animate__animated animate__fadeIn mt-2">
    
                <div className="row ">
                    <div className="col-4 mt-2">
                        <h4 style={{ color: '#ffffff' }}>Search</h4>
                        <hr />  
                        <form onSubmit={handleSearch2}>
                            <select className="form-control" name="type" onChange={handleInputChange2}>
                                <option selected>Select type</option>
                                <option value="GE"> GENERAL </option>
                                <option value="AD"> AD </option>
                                <option value="DR"> DR </option>
                                <option value="LV"> LV </option>
                                <option value="TM"> TM </option>
                                <option value="BL"> BLACKLIST </option>
                                <option value="INF"> INFOGRAPHS </option>
                            </select>
                        </form>
                    </div>
                    <div className="col-8 animate__animated animate__fadeIn mt-2">
                        <h4 style={{ color: '#ffffff' }}>Results</h4>
                        <hr />
                        {(docs.length !== 0)&&
                         docs.map(doc =>(
                            
                            <div className="container-fluid animate__animated animate__fadeIn py-3" style={{maxWidth: 800, maxHeight: 200}}>
                                <div className="card mx-5" >
                                    <div className="row g-2">
                                        <div className="col-md-4 card-imagen ml-4">
                                        <img src={doc.image} className="img-fluid rounded-start" width="120" height="120" alt="..." />
                                        </div>
                                        <div className="col-md-7 text-center">
                                        <div className="card-body">
                                            <form onClick={handleUpdate}>  
                                                <button type="button"  value={JSON.stringify(doc)} className="btn btn-warning form-control my-2">Update</button>
                                            </form>
                                            <form onClick={handleDelete}>  
                                                <button type="button" value={JSON.stringify(doc)} className="btn btn-danger form-control my-2">Delete</button>
                                            </form>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                             </div>
                        ))      
                        }
                        
                        {(docs.length === 0  && type !==undefined && type !=='Select type')&&
                            <div className="alert alert-danger">
                                No matches found with {type}
                            </div>
                        }
                        {(type === undefined || type ==="Select type")&&
                            <div className="alert alert-primary">
                                Please do a search
                            </div>
                        }
                    </div>
                </div>
            </div>
                }
                

            </div>
            <EditModal />
        </div>
        </>
    )
}
