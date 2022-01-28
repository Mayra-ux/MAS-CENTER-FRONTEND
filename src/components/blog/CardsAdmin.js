// ADD BY MAYRA

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//import Swal from 'sweetalert2'; ,updateBlogCards
import {getBlogCards} from '../../actions/blogCards';
import { uiOpenModalDoc } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import {docSetActive} from '../../actions/blogCards';
import { EditModalCards } from './EditModalCards';

export const CardsAdmin = ({history}) => {

    const { role } = useSelector( state => state.auth );
    //, handleInputChange2
    const [formValues2] = useForm();

    const {type} = formValues2;

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getBlogCards());
    }, [dispatch])
    
    let cards= useSelector(state => state.cards.cards);
    console.log(cards); // add Mayra


    // let blogCardsFind = () => { dispatch(getBlogCards()); 
    // console.log("Este es un blog cards: " + blogCardsFind);
    // }
    // let docs =[] 
    // let docsF = useSelector(state => state.paises.docs);

    // const handleSearch2 = (e) =>{
    //     e.preventDefault();
    // } 


    const handleUpdate = (e) =>{
        const temp =JSON.parse(e.target.value); 
        console.log(temp);
        dispatch(docSetActive(temp));
        dispatch(uiOpenModalDoc());
    }   
    // const handleNew= (e) =>{
    //     console.log("Nuevo");
    //     dispatch(newBlogErizo(null));
    //     dispatch(uiOpenModalDoc());
    // }
    // const handleDelete = (e) =>{
    //     const temp =JSON.parse(e.target.value); 
    //     console.log(temp.id);
    //     Swal.fire({
    //         title: 'Are you sure to delete this doc?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //             dispatch(deleteBlogErizo(temp.id));
                
    //         }
    //       })
    // }    
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
                         <h1 className="text-center" style={{ color: '#ffffff' }}>CARDS</h1>
                       
                    </div>
                }
                {(role==='Agente' || role==='AgenteDB'|| role==='CoordDB' || role==='RH' || role==='CoordQA')&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>Access Denied</h1>
                    </div>
                }
                <hr />
                {(role ==="Admin" || role==="PD Admin")&&
                <div className="container-fluid  animate__animated animate__fadeIn mt-2">
    
                <div className="row ">
               
                    <div className="col-8 container animate__animated animate__fadeIn mt-2">
                        <h4 style={{ color: '#ffffff' }}>Results</h4>
                        <hr />
                        {(cards.length !== 0)&&
                         cards.map(doc =>(
                            <>
                            

                            <div className="container-fluid animate__animated animate__fadeIn py-3 my-2" style={{maxWidth: 800, maxHeight: 300}}>
                                <div className="card mx-5" >
                                    <div className="row g-2">
                                        <div className="col-md-4 card-imagen ml-4">
                                        <img src={doc.image} className="img-fluid rounded-start" width="120" height="120" alt="..." />
                                        </div>
                                        <div className="col-md-7 text-center">
                                        <div className="card-body">
                                        {(doc.name==='erizo')&&
                                            <>
                                            <h3 className='text-white'>Erizo Card</h3>
                                        
                                            </>
                                        }
                                        {(doc.name==='obRules')&&
                                            <>
                                            <h3 className='text-white'>Reglas Obsoletas</h3>
                                        
                                            </>
                                        }
                                        {(doc.name==='spRules')&&
                                            <>
                                            <h3 className='text-white'>Reglas especiales</h3>
                                        
                                            </>
                                        }
                                        {(doc.name==='memes')&&
                                            <>
                                            <h3 className='text-white'>Memes</h3>
                                        
                                            </>
                                        }
                                            <form onClick={handleUpdate}>  
                                                <button type="button"  value={JSON.stringify(doc)} className="btn btn-warning form-control my-2">Update</button>
                                            </form>
                                            
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                             </div>
                             </>
                        ))      
                        }
                        
                        {(cards.length === 0 && type !== "select")&&
                            <div className="alert alert-danger">
                                No matches found with {type} 
                            </div>
                        }
                        {(type === "select")&&
                            <div className="alert alert-primary">
                                Please do a search
                            </div>
                        }
                    </div>
                </div>
            </div>
                }
                

            </div>
            <EditModalCards/>
        </div>
        </>
    )
}