// ADD BY MAYRA

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {getBlogErizo,newBlogErizo,updateBlogErizo,deleteBlogErizo} from '../../actions/blogErizo';
import { uiOpenModalDoc, uiOpenModalErizo } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { EditModal } from '../../components/blog/EditModal';
import {docSetActive} from '../../actions/blogErizo';

export const ErizoAdmin = ({history}) => {

    const { role } = useSelector( state => state.auth );


    //
    const [formValues2, handleInputChange2] = useForm();


    // selects
    const {month} = formValues2;

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getBlogErizo());
    }, [dispatch])
    
    let erizo2= useSelector(state => state.erizo.erizo); //peticion del backend
    console.log(erizo2); // add Mayra

    //creamos la fecha actual
    const date= new Date();
    let actualDate=date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-01"
    console.log("actualDate", actualDate)
    //----------------------------------------------------------------------Fecha actual
    
   //Agregamos constante y metodo handler
   const[dateImage, setDateImage]= useState(actualDate)
    
   const handlerFilterErizo= function(e){
       let fecha= date.getFullYear()+"-"+e.target.value+"-01";
       setDateImage(fecha);
   }
   //--------------------------------------------------------------------constante y handler


    //Previene que no se rendericen como null los selects
    const handleSearch2 = (e) =>{
        e.preventDefault();
    } 

    // responde al boton update que abre el modal
    const handleUpdate = (e) =>{
        const temp =JSON.parse(e.target.value); 
        console.log(temp);
        //dispatch(updateBlogErizo(temp));
        dispatch(docSetActive(temp));
        dispatch(uiOpenModalDoc());

         
    }   

    // docSetActive almacena temporalmente en redux para saber si es un update o un delete, desde el editModal
    // 

    //----------------------------------------------------
    //              create new erizo image 
    //----------------------------------------------------
    const handleNew= (e) =>{
        console.log("Nuevo");
        dispatch(docSetActive(null)); //
        dispatch(uiOpenModalDoc());
    }

    //----------------------------------------------------
    //              delete erizo image 
    //----------------------------------------------------

    const handleDelete = (e) =>{ // metodo para eliminar un elemnto su parametro es e, que representa un elemento html
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
                dispatch(deleteBlogErizo(temp.id));
                
            }
          })
    }    
    // if(year !== undefined && month!== undefined){
    //     try {
    //         docs = erizo2.filter(doc=> doc.erizo.name === pais && doc.type === type);
    //     } catch (error) {
    //         console.log("Error")
    //     }
    // }

    return (
        <>
        <div>
        <hr />
            <div className="container-fliud center text-center">

          
                {(role==="Admin" || role==="PD Admin")&&
                    <div>
                         <h1 className="text-center" style={{ color: '#ffffff' }}>ERIZO</h1>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-success"  onClick={handleNew}>
                                <i className="fas fa-file-image"></i> New image
                            </button>
                        </div>
                    </div>
                }
                {(role==='Agente' || role==='AgenteDB'|| role==='CoordDB' || role==='RH' || role==='CoordQA')&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>Access Denied</h1>
                    </div>
                }
                <hr />
                {(role==="Admin" || role==="PD Admin")&&
                <div className="container-fluid  animate__animated animate__fadeIn mt-2">
    
                <div className="row ">
                    <div className="col-4 mt-2">
                        <h4 style={{ color: '#ffffff' }}>Search</h4>
                        <hr />  

                        <form onSubmit={handleSearch2}>
                       
                            {/* <select className="form-control mt-2" name="year" onChange={blogErizoFind}>
                                <option selected>Select Year</option>
                                <option value="2021"> 2021 </option>
                                <option value="2022"> 2022 </option>
                            </select> */}
                            <select className="form-control mt-2" name="month" onChange={handlerFilterErizo}>
                                <option value="00"selected>Select Month</option>
                                <option value="01"> Enero </option> 
                                <option value="02"> Febrero</option> 
                                <option value="03"> Marzo</option> 
                                <option value="04"> Abril</option> 
                                <option value="05"> Mayo</option> 
                                <option value="06"> Junio</option> 
                                <option value="07"> Julio</option> 
                                <option value="08"> Agosto</option> 
                                <option value="09"> Semptiembre</option> 
                                <option value="10"> Obtubre </option> 
                                <option value="11"> Noviembre</option> 
                                <option value="12"> Diciembre </option> 
                            </select>
                            {/* <input type= "date" className="form-control mt-2"></input> */}
                        </form>
                    </div>
                    <div className="col-8 container animate__animated animate__fadeIn mt-2">
                        <h4 style={{ color: '#ffffff' }}>Results</h4>
                        <hr />
                        {(erizo2.length !== 0)&&
                         erizo2.map(doc =>(doc.date.substr(0,10)===dateImage&&
                            
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
                        
                        {/* && month !== undefined 
                        {(erizo2.length === 0 )&&
                            <div className="alert alert-danger">
                                No matches found with
                            </div>
                        }*/}

                        {/* year === undefined &&  
                        {(erizo2.length === 0&&month === "00")&&
                            <div className="alert alert-primary">
                                Please do a search
                            </div>
                        }*/}
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