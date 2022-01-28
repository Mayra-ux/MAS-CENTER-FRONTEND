
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {  docSetActive } from '../../actions/countries';
import { deleteDashDoc } from '../../actions/dash';
import { uiOpenModalDoc } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { GetDash, GetDashDocs } from '../../selectors/getDash';

import { EditModalDoc } from './EditModalDocs';

export const AdminDocDash = ({history}) => {

    const { role } = useSelector( state => state.auth );

    const [formValues2, handleInputChange2] = useForm();

    const {pais, type} = formValues2;

    const dispatch = useDispatch();
    

    GetDash();
    GetDashDocs();
    
    
    let paises = useSelector( state => state.custom.dashb ); 
    let custom = paises.find(doc=> doc.name === pais );
    //console.log(custom);
    let docs =[] 
    let docsF = useSelector(state => state.custom.dashDocs);
    //console.log(custom);
    const handleSearch2 = (e) =>{
        e.preventDefault();
    } 


    const handleUpdate = (e) =>{
        const temp =JSON.parse(e.target.value); 
        //console.log(temp);
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
        console.log(temp.id);
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
                dispatch(deleteDashDoc(temp.id));
                
            }
          })
    }    
    if(pais !== undefined && type !== undefined){
        try {
            docs = docsF.filter(doc=> doc.dashboard === custom._id && doc.type === type);
            //console.log(docs);
        } catch (error) {
            console.log("Error")
        }
    }

    return (
        <>
        <div>
        <hr />
            <div className="container-fliud center text-center">
                {(role==="Admin" || role==="CoordDB")&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>DASHBOARD DOCS</h1>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-success"  onClick={handleNew}>
                                <i className="fas fa-file-image"></i> New Doc
                            </button>
                        </div>
                    </div>
                }
                {(role==='Agente' || role==='AgenteDB'|| role==='CoordCD' || role==='CoordQA' || role==='RH')&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>Access Denied</h1>
                    </div>
                }
                <hr />
                {(role ==="Admin" || role==="CoordDB")&&
                <div className="container-fluid  animate__animated animate__fadeIn mt-2">
    
                <div className="row ">
                    <div className="col-4 mt-2">
                        <h4 style={{ color: '#ffffff' }}>Search</h4>
                        <hr />  

                        <form onSubmit={handleSearch2}>
                        <select className="form-control" name="pais" onChange={handleInputChange2}>
                                <option selected>Select custom document</option>
                                {paises.map(pais => {
                                return (
                                    <option value={pais.name}> {pais.name} </option>
                                )
                                })}
                            </select>
                            <select className="form-control mt-2" name="type" onChange={handleInputChange2}>
                                <option selected>Select type</option>
                                <option value="EX"> EXAMPLES </option>
                                <option value="SR"> SPECIAL RULES </option>
                                <option value="IN"> INFOGRAPHS </option>
                                <option value="IA"> ID'S ACCEPTED </option>
                                <option value="INA"> ID NOT ACCEPTED </option>
                            </select>
                        </form>
                    </div>
                    <div className="col-8 container animate__animated animate__fadeIn mt-2">
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
                        
                        {(docs.length === 0 && pais !== undefined && type !== undefined)&&
                            <div className="alert alert-danger">
                                No matches found with {pais} / {type}
                            </div>
                        }
                        {(pais === undefined && type === undefined)&&
                            <div className="alert alert-primary">
                                Please do a search
                            </div>
                        }
                    </div>
                </div>
            </div>
                }
            </div>
            <EditModalDoc />
        </div>
        </>
    )
}
