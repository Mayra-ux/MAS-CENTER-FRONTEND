import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { docUpdate, newDoc } from '../../actions/countries';
import { uiCloseModalDoc } from '../../actions/ui';
import "./modalStyle.css"

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');
  let initEvent = {
    country: '',
    type: '',
    image: '',
}
    
    
export const EditModal = () => {
    const dispatch = useDispatch();

    let paises = useSelector(state => state.paises.paises);
    let activeDoc = useSelector(state => state.paises.activeDoc);
    
    let modalOpenDoc = useSelector(state => state.ui.modalOpenDoc);
    const [formValues, setFormValues] = useState( initEvent );

    let {image} = formValues;

    const closeModal = () =>{
        dispatch(uiCloseModalDoc());
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(formValues);
        let image = formValues.image;
        image = image.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image = image.replace("/view?usp=sharing", "");
        console.log( image);
        if (!image) {
            if(activeDoc!== null){
                image= activeDoc.image;
            }
        }
        if(formValues.country === "" || formValues.type === ""){
            Swal.fire('Error', "Please select a country and type of document", 'error');
        }else{
            if(activeDoc ===null){
                
                dispatch(newDoc(formValues.country, formValues.type, image));
                
            }else{
                dispatch(docUpdate(formValues.country, formValues.type, image, activeDoc.id));
                
            }
        }
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    if (activeDoc !==null) {
        image = activeDoc.image;
    }
    return (
        <Modal
            isOpen={modalOpenDoc}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo">
            <div>
                <h1 className="text-center">  { (activeDoc)? 'Update doc': 'New doc' }</h1>
                <hr />
                <form className="container" onSubmit={handleSubmitForm}>

                    <div className="form-group">
                        <label>Country</label>
                        <select className="form-control" name="country" onChange={ handleInputChange }>
                            <option selected> Select a country </option>
                            {paises.map(pais => {
                            return (
                                <option value={pais._id}> {pais.name} </option>
                            )
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Type</label>
                        <select className="form-control" name="type" onChange={ handleInputChange }>
                            <option selected>Select type</option>
                            <option value="NI"> NI </option>
                            <option value="DL"> DL </option>
                            <option value="PS"> PS </option>
                            <option value="BL"> BLACKLIST </option>
                            <option value="SR"> SPECIAL  RULES </option>
                            <option value="CC"> CUSTOMER COMPLAINT </option>
                            <option value="IN"> INFOGRAPHS </option>
                            <option value="BL"> BLOG </option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Url</label>
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="https://drive.google.com/file/d/....."
                            name="image"
                            autoComplete="off"
                            value={image}
                            onChange={ handleInputChange }
                        />
                    </div>
                    <hr />
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block">
                        <i className="far fa-save"></i>
                        <span> Save </span>
                    </button>

                </form>
            </div>
        </Modal>
    )
}
