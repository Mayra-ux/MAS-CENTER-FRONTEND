//ADD BY MAYRA

import React from 'react';
import Card from 'react-bootstrap/Card'
//import Button from 'react-bootstrap/Button'
import CardGroup from 'react-bootstrap/CardGroup'
//import Image from 'react-bootstrap/Image'
import Carousel from 'react-bootstrap/Carousel'
import {NavLink } from 'react-router-dom'

//---------imports para generar la consulta
import { useDispatch, useSelector } from 'react-redux';
import {getBlogCards} from '../../actions/blogCards';
import {getBlogCarousel} from '../../actions/blogCarousel'
import { useEffect } from 'react';
//----------------------------------


export const BlogScreen = () =>{


    //--------------------------- codigo para ejecutar la consulta ----------------
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getBlogCards());
    }, [dispatch])
    
    let cards= useSelector(state => state.cards.cards);
    console.log("Estas son las cards que llegan: "+ JSON.stringify(cards));

    useEffect(() => {
        dispatch(getBlogCarousel());
    }, [dispatch])
    
    let ca= useSelector(state => state.carousel.carousel);
    console.log("estos son los carousel que llegan"+JSON.stringify(ca));
    //---------------------- final codigo para ejecutar la consulta ---------------
    
    document.body.style.backgroundColor = "#283040";
    return(
        <>

        <div className="animate__animated animate__fadeIn offset-md-0 mt-3" >
            
            <hr />
            <h1 className="text-center" style={{ color: '#ffffff' }}>
                Noti MAS
            </h1>
            <hr />
            
        </div>


        <div  className="animate__animated animate__fadeIn container mt-5 mx-auto">
        {/* className='border border-light rounded-1 p-5' */}
            <div >
            
            <div  className="row">
            {/*Aqui se mapea la consulta */}
            {(cards.length !== 0)&&cards.map(card=>(
                <>
                {/*-------------------------------------------------------------------------
                                            Card 1 Toma Erizo                          
                ---------------------------------------------------------------------------*/}
                {(card.name==="erizo")&&
                    <>
                        <div  className="col-lg-3 col-md-6 col-sm-6 my-1 mx-auto">
                            <NavLink  className="active" className="nav-item nav-link text-center text-white"  to="/erizo"> 
                                            
                                <CardGroup>
                                    <Card className="text-white border border-info" style={{ width: '20rem' , height: '35rem'}}>
                                        <Card.Img variant="top" key={card.name} src={card.image} />
                                    </Card>
                                </CardGroup>
                            </NavLink>
                        </div>
                    </>
                }
                {/*-------------------------------------------------------------------------
                                            Card 2 Reglas especiales                          
                ---------------------------------------------------------------------------*/}
                {(card.name==="spRules")&&
                    <>
                        <div  className="animate__animated animate__fadeIn col-lg-3 col-md-6 col-sm-6 my-1 mx-auto">
                            <NavLink  className="active" className="nav-item nav-link text-center text-white"  to="/especialRules"> 
                                <CardGroup >
                                    <Card className="text-white border border-warning" style={{ width: '20rem' , height: '35rem'}}>
                                        <Card.Img variant="top" key={card.name} src={card.image} />
                                    </Card>
                                </CardGroup>
                            </NavLink>
                        </div>
                    </>
                }
                {/*-------------------------------------------------------------------------
                                    Card 3 Documentos y reglas obsoletas                          
                ---------------------------------------------------------------------------*/}
                {(card.name==="obRules")&&
                    <>
                        <div  className="animate__animated animate__fadeIn col-lg-3 col-md-6 col-sm-6 my-1 mx-auto">
                            <NavLink  className="active" className="nav-item nav-link text-center ml-1 text-white"  to="/obsoleteRules"> 
                                <CardGroup>
                                    <Card className="text-white border border-danger" style={{ width: '20rem' , height: '35rem' }}>
                                        <Card.Img variant="top" key={card.name} src={card.image} />
                                    </Card>
                                </CardGroup>
                            </NavLink>
                        </div>
                    </>
                }
                {/*-------------------------------------------------------------------------
                                           Card 4 Mejores memes                          
                ---------------------------------------------------------------------------*/}
                {(card.name==="memes")&&
                    <>
                        <div  className="animate__animated animate__fadeIn col-lg-3 col-md-6 col-sm-6 my-1 mx-auto">
                            <NavLink  className="active" className="nav-item nav-link text-center ml-1 text-white"  to="/memes">      
                                <CardGroup>
                                
                                    <Card className="text-white border border-success" style={{ width: '20rem' , height: '35rem' }}>
                                        <Card.Img variant="top" key={card.name} src={card.image} />
                                    
                                    </Card>
                                </CardGroup>
                            </NavLink>
                            
                        </div>
                    </>
                }

                </>
                ))}
            
            </div>
        </div>
            
            <Carousel className ='mt-5 border border-light rounded-1 p-5' variant="dark">
                {(ca.length !== 0)&&ca.map(carousel=>(        
                    <Carousel.Item>
                        {console.log("este es el carrusel:  " + carousel.image)}
                        <img
                            className="d-block w-100"
                            //src="./gorrito.jpg"
                            
                            src={carousel.image}
                            alt="First slide"
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
            
,

        <div className='border border-light rounded-1 p-2'>
        <div  className=" my-3 mx-auto">
            <div  className="row">
                
            {/*--------------------- Guia para trabajar desde casa -----------------------*/}
                <div className='col-lg-6'> 
                    <a  activeClassName="active" className="nav-item nav-link text-center ml-1 text-white"  href='https://drive.google.com/uc?export=view&id=17YPuF7efZ-2lXHBox3oKcynfCwvhNYEN' target="_blank">    
                        <img className='w-100' src='https://drive.google.com/uc?export=view&id=13u_mbpqb5LrBEnCee_lOXvSY3XzAsy0E' alt ='imagen-who'></img>
                    </a>
                </div>

            {/* ------------------------¿Quienes somos?------------------------------ */}
                
                <div className='col-lg-6' >
                    
                    <a  activeClassName="active" className="nav-item nav-link text-center ml-1 text-white"  href='https://drive.google.com/uc?export=view&id=1eII1rq2U2EYlmwyae2QOIG_T3CKQf5Mq' target="_blank">    
                    <img className='w-100' src='https://drive.google.com/uc?export=view&id=1qJqnjxWJu99CelUXnSPownmtLYE0LP_y' alt ='imagen-who'></img>
                    </a>
                    
                </div>
              
                
            </div>
        </div>
        </div> 
                    
            </div>

                        
            </>    
                    )
                }