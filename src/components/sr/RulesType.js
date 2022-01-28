import React, { useState, useCallback } from 'react';
import {useParams} from 'react-router-dom'
import { GetSRByType } from '../../selectors/getSRByType';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { NavLink } from 'react-router-dom'

export const RulesType = () =>{
    let {type} = useParams();

    
    let documentos = GetSRByType(type);
    //console.log(documentos);
    documentos = documentos.filter(sr => sr.type === type);
    let imagenes = documentos.map(imagen=>(
        imagen.image
    ));

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
    console.log(type);
    return(
        <div className=" container-fluid animate__animated animate__fadeIn">
            <hr />
            <div className="text-center" style={{ color: '#ffffff' }}>
                <h1>
                    {
                        (type==="BLACKLIST")&&
                        "BLACKLIST"
                    }
                    {
                        (type!=="BLACKLIST" && type!=="INF")&&
                        "SPECIAL RULES"
                    }
                    {
                        (type==="INF")&&
                        "INFOGRAPHS"
                    }
                </h1>
                <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                    {
                        (type!=="GE")&&
                        <button type="button" className="btn btn-secondary">
                            <NavLink to={`../../sr/GE`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a'}}>GENERAL</NavLink>
                        </button>
                    }
                    {
                        (type!=="AD")&&
                        <button type="button" className="btn btn-secondary">
                            <NavLink to={`../../sr/AD`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a'}}>AD</NavLink>
                        </button>
                    }
                    {
                        (type!=="DR")&&
                        <button type="button" className="btn btn-secondary">
                            <NavLink to={`../../sr/DR`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a'}}>DR</NavLink>
                        </button>
                    }
                    {
                        (type!=="TM")&&
                        <button type="button" className="btn btn-secondary">
                            <NavLink to={`../../sr/TM`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a'}}>TM</NavLink>
                        </button>
                    }
                    {
                        (type!=="LV")&&
                        <button type="button" className="btn btn-secondary">
                            <NavLink to={`../../sr/LV`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a'}}>LV</NavLink>
                        </button>
                    }
                    {
                        (type!=="BL")&&
                        <button type="button" className="btn btn-secondary">
                            <NavLink to={`../../sr/BL`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a'}}>BLACKLIST</NavLink>
                        </button>
                    }
                    {
                        (type!=="INF")&&
                        <button type="button" className="btn btn-secondary">
                            <NavLink to={`../../sr/INF`} className="stretched-link font-weight-bold" style={{ color: '#d9b54a'}}>INFOGRAPHS</NavLink>
                        </button>
                    }
                </div>
            </div>
            <hr />
            <div className=" container-fluid md-1 ml-3 ">
                {imagenes.map((src, index) => (
                    <img
                    placeholder={'https://mas.getmati.com/static/media/mati-spinner-black.11804185.svg'}
                    error={"https://www.azendportafolio.com/static/img/not-found.png"}
                    src={src}
                    onClick={() => openImageViewer(index)}
                    width="300"
                    key={index}
                    style={{ margin: "2px", maxHeight:250 }}
                    alt=""
                    />
                ))}

                {isViewerOpen && (
                    <Lightbox image={currentImage} images={imagenes} onClose={closeImageViewer} keyboardInteraction={true} closeOnClickOutside={true} startIndex={currentImage}></Lightbox>
                )}
            </div>  
        </div>
    )
}