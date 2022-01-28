import React, { useState, useCallback } from 'react';
import { useDispatch } from "react-redux";
import {useParams} from 'react-router-dom'
import { GetDocByType } from '../../selectors/getDocByType';
import Img from "react-cool-img";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { useEffect } from 'react';
import { docSetActive, getCountries } from '../../actions/countries';
import { NavLink } from 'react-router-dom'
import { EditModal } from './EditModal';
import { uiOpenModalDoc } from '../../actions/ui';

export const PaisDoc = () =>{
    let {paisId, type} = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])
    
    let documentos = GetDocByType( );
    
    let otro = documentos.filter(doc=> doc.country.name === paisId && doc.type === type);
    let imagenes =[];
    console.log(otro);

    try {
        imagenes = otro.map(imagen=>(
            imagen.image
        ));
    } catch (error) {
        console.log("No pude");
    }
    

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
      }, []);
    
      const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
      };

    if(type==='BL'){
        type="BLACKLIST";
    }
    if(type==='SR'){
        type="SPECIAL RULES";
    }
    if(type==='CC'){
        type="CUSTOMER COMPLAINT";
    }
    if(type==='IN'){
        type="INFOGRAPHS";
    }

   

    const handleSearch = (e) =>{
        e.preventDefault();
        const temp =({paisId,type}); 
        console.log(temp);
        dispatch(docSetActive(temp));
        dispatch(uiOpenModalDoc());
    }
    console.log(type);
    return(
        <div className="container-fluid  animate__animated animate__fadeIn mt-2">
            <hr />
            <div className="text-center">
                <div className="row">
                    <div className="col-md-1">
                    
                    </div>
                    <div className="col-md-10">
                        <h1  style={{ color: '#ffffff' }}>
                            {paisId} {type}
                        </h1>
                    </div>
                    <div className="col-md-1">
                        <form onSubmit={handleSearch}>
                            <button type="submit" className="btn  btn-outline-primary"><i class="fas fa-file-image"></i></button>
                        </form>
                    </div>
                </div>
                
                <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                    {
                        (type!=="NI")&&
                        <button type="button" className="btn btn-secondary custom">
                            <NavLink to={`../../${paisId}/NI/`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a'}}>NI</NavLink>
                        </button>
                    }
                    {
                        (type!=="DL")&&
                        <button type="button" className="btn btn-secondary custom">
                            <NavLink to={`../../${paisId}/DL/`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a'}}>DL</NavLink>
                        </button>
                    }
                    {
                        (type!=="PS")&&
                        <button type="button" className="btn btn-secondary custom">
                            <NavLink to={`../../${paisId}/PS/`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a'}}>PS</NavLink>
                        </button>
                    }
                    {
                        (type!=="BLACKLIST")&&
                        <button type="button" className="btn btn-secondary custom">
                            <NavLink to={`../../${paisId}/BL/`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a'}}>BLACKLIST</NavLink>
                        </button>
                    }
                    {
                        (type!=="SPECIAL RULES")&&
                        <button type="button" className="btn btn-secondary custom">
                            <NavLink to={`../../${paisId}/SR/`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a', fontSize:12}}>SPECIAL RULES</NavLink>
                        </button>
                    }
                    {
                        (type!=="INFOGRAPHS")&&
                        <button type="button" className="btn btn-secondary custom">
                            <NavLink to={`../../${paisId}/IN/`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a', fontSize:12}}>INFOGRAPHS</NavLink>
                        </button>
                    }
                    {
                        (type!=="CUSTOMER COMPLAINT")&&
                        <button type="button" className="btn btn-secondary custom">
                            <NavLink to={`../../${paisId}/CC/`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a', fontSize:12}}>C. COMPLAINT</NavLink>
                        </button>
                    }
                </div>
                <hr />
            </div>
                {
                    (imagenes.length === 0 && type!=="BLACKLIST" && type!=="SPECIAL RULES" && type!=="CUSTOMER COMPLAINT")
                    &&
                    <div className="alert alert-danger mt-1" role="alert">
                        <h4 className="alert-heading">No {type} found for {paisId}</h4>
                        <p>If you have found such documents please, send them to the C.I. department. </p>
                        <hr />
                        <p className="mb-0">Si has encontrado este documento por favor envialos al dpto. de C.I.</p>
                    </div>
                    
                }
                {
                    (imagenes.length === 0 && (type==="BLACKLIST" || type==="SPECIAL RULES" || type==="CUSTOMER COMPLAINT"))
                    &&
                    <div className="alert alert-danger mt-1" role="alert">
                        <h4 className="alert-heading">No {type} found for {paisId}</h4>
                    </div>
                }
            <div className="container-fluid animate__animated animate__fadeIn mt-2 pl-5">
                {imagenes.map((src, index) => (
                    <Img
                    placeholder={'https://mas.getmati.com/static/media/mati-spinner-black.11804185.svg'}
                    error={"https://www.azendportafolio.com/static/img/not-found.png"}
                    className="px-1 py-1"
                    src={src}
                    onClick={() => openImageViewer(index)}
                    width="300"
                    cache={true}
                    key={index}
                    style={{ margin: "2px", maxHeight:250 }}
                    alt=""
                    />
                ))}

                {isViewerOpen && (
                    <Lightbox image={currentImage} images={imagenes} onClose={closeImageViewer} keyboardInteraction={true} closeOnClickOutside={true} startIndex={currentImage}></Lightbox>
                )}
            </div>
            <EditModal />
        </div>
    )
}