import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom'
import Img from "react-cool-img";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { docSetActive } from '../../actions/countries';
import { NavLink } from 'react-router-dom'
import { EditModal } from './modalPost';
import { uiOpenModalDoc } from '../../actions/ui';
import { GetCustomsDocs, GetCustoms } from '../../selectors/getCustoms';

export const CustomDocs = () =>{
    let {webhook, type} = useParams();

    const dispatch = useDispatch();
    GetCustoms();

    GetCustomsDocs();
    
    let customs = useSelector( state => state.custom.customs );
    let documentos = useSelector( state => state.custom.customsDocs );

    customs = customs.find(doc=> doc.name === webhook);
    //customs = customs[0]
    //console.log(customs);

    let otro = documentos.filter(doc=> doc.typeCustom === customs._id && doc.type === type);
    //console.log(otro);
    let imagenes =[];
    //console.log(otro);

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

    if(type==='EX'){
        type="EXAMPLES";
    }
    if(type==='SR'){
        type="SPECIAL RULES";
    }
    if(type==='IN'){
        type="INFOGRAPHS";
    }

    const handleSearch = (e) =>{
        e.preventDefault();
        const temp =({webhook,type}); 
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
                            {webhook}
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
                        (type!=="EXAMPLES")&&
                        <button type="button" className="btn btn-secondary custom">
                            <NavLink to={`../../${webhook}/EX/`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a', fontSize:12}}>EXAMPLES</NavLink>
                        </button>
                    }
                    {
                        (type!=="SPECIAL RULES")&&
                        <button type="button" className="btn btn-secondary custom">
                            <NavLink to={`../../${webhook}/SR/`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a', fontSize:12}}>SPECIAL RULES</NavLink>
                        </button>
                    }
                    {
                        (type!=="INFOGRAPHS")&&
                        <button type="button" className="btn btn-secondary custom">
                            <NavLink to={`../../${webhook}/IN/`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a', fontSize:12}}>INFOGRAPHS</NavLink>
                        </button>
                    }
                </div>
                <hr />
            </div>
                {
                    (imagenes.length === 0 && (type==="EXAMPLES" || type==="SPECIAL RULES" || type==="INFOGRAPHS"))
                    &&
                    <div className="alert alert-danger mt-1" role="alert">
                        <h4 className="alert-heading">No {type} found for {webhook}</h4>
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