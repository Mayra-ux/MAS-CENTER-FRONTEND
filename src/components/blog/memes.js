//ADD BY MAYRA

import React, {useState} from 'react';
import {NavLink } from 'react-router-dom'


//-------------------imports para generar la consulta
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { getBlogMemes } from '../../actions/blogMemes';
//---------------------------------------------------

export const Memes = () =>{

    //----------------------------código para ejecutar la consulta-------------------------
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogMemes());
    }, [dispatch])
    
    let bM= useSelector(state => state.memes.memes); 
    console.log(bM); // add Mayra
//-------------------------------------------------------------------------------------  

   //creamos la fecha actual
   const date= new Date();
   let actualDate=date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-01"
   console.log("actualDate", actualDate)
   //----------------------------------------------------------------------Fecha actual

   

   //Agregamos constante y metodo handler
   const[dateImage, setDateImage]= useState(actualDate)
   
   const handlerFilterMemes= function(e){
       let fecha= date.getFullYear()+"-"+e.target.value+"-01";
       setDateImage(fecha);
   }
   //--------------------------------------------------------------------constante y handler

    document.body.style.backgroundColor = "#283040";
    return(
            <>
            <div className="animate__animated animate__fadeIn offset-md-0 mt-3">
                <hr />
                <h1 className="text-center" style={{ color: '#ffffff' }}>
                Memes
                </h1>
                <hr />
                
            </div>
            <div className="animate__animated animate__fadeIn container mt-2 col-lg-12 col-md-12 col-sm-12 mx-auto">
            <div className='container-fluid'>
            <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12' >
                            
                            <nav aria-label="breadcrumb" style={{ backgroundColor : "#283040"}}>
                                <ol className="breadcrumb" style={{ backgroundColor : "#283040"}}>
                                <li className="breadcrumb-item">
                                    <a href="" className='text-white'>
                                        <NavLink  activeClassName="active" className=" text-white"  to="/blog">Blog
                                        </NavLink>
                                    </a></li>
                                <li className="breadcrumb-item active" aria-current="page">Memes</li>
                                </ol>
                            </nav>
                        </div>
                </div>

            </div>
                <div className='container'>
                

                <div className='row'>

                        <div className='col-lg-2 col-md-2 col-sm-2 row mt-1 h-100'>
                                <div class = "mx-auto my-1 row">
                                    {/* <img
                                        className="mx-auto w-50"
                                        src="./sonriente.png"
                                        alt="First slide"
                                    /> */}
                                </div>

                                <div class = "mx-auto my-1">
                                    <select className="form-control" name="date" onChange={ handlerFilterMemes }>
                                            <option selected>Select Month</option>
                                            <option value="01"> January </option>
                                            <option value="02"> February </option>
                                            <option value="03"> March </option>
                                            <option value="04"> April </option>
                                            <option value="05"> May </option>
                                            <option value="06"> June </option>
                                            <option value="07"> July </option>
                                            <option value="08"> August </option>
                                            <option value="09"> September </option>
                                            <option value="10"> October </option>
                                            <option value="11"> November </option>
                                            <option value="12"> December </option>
                                        </select>

                                

                                </div>
                        


                            
                        </div>
                    

                    
                        <div className="col-lg-10 col-md-10 col-sm-10 row my-1">
                            {(bM.length !== 0)&&bM.map(mm=>( mm.date.substr(0,10)===dateImage&&
                                <div className="col-lg-6 col-md-6 col-sm-6 row mx-auto">
                                

                                    <div class="card col-12 mt-5" style={{border: 'none'}} >
                                        <img
                                        className="d-block w-100 h-100"
                                        src={mm.image}
                                        alt="First slide"
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                
                </div>

        </div>

        
        
        
        </>
        
        )
    
    }