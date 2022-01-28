import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { newCustom, updateCustom } from '../../actions/customs';
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
    name: '',
    image: '',
}
    
    
export const EditModal = () => {
    const dispatch = useDispatch();

    let paises = useSelector(state => state.paises.paises);
    let activeDoc = useSelector(state => state.paises.activeDoc);
    
    let modalOpenDoc = useSelector(state => state.ui.modalOpenDoc);
    const [formValues, setFormValues] = useState( initEvent );

    let {image, name} = formValues;

    const closeModal = () =>{
        dispatch(uiCloseModalDoc());
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        let image = formValues.image;
        image = image.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image = image.replace("/view?usp=sharing", "");
        if (!image) {
            if(activeDoc!== null){
                image= activeDoc.image;
            }
        }
        if(formValues.name === "" || formValues.image === ""){
            Swal.fire('Error', "Please select a country and type of document", 'error');
        }else{
            if(activeDoc ===null){
                dispatch(newCustom(formValues.name, image));
                
            }else{
                dispatch(updateCustom(formValues.name, image, activeDoc.id));
                
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
                <h1 className="text-center"> New Custom Document</h1>
                <hr />
                <form className="container" onSubmit={handleSubmitForm}>

                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Tarjeta de circulacion"
                            name="name"
                            autoComplete="off"
                            value={name}
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="form-group">
                        <label>Image url</label>
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
