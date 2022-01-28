//add by Mayra

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { updateBlogCards} from '../../actions/blogCards';
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
    date: '',
    image: ''
}
      
export const EditModalCards= () => {
    const dispatch = useDispatch();
    const date= new Date();
    const year= date.getFullYear();
    

    let activeDoc = useSelector(state => state.cards.activeDoc);
    console.log("activeDoc: "+JSON.stringify(activeDoc))

    let modalOpenDoc = useSelector(state => state.ui.modalOpenDoc);
    const [formValues, setFormValues] = useState( initEvent );

    let {image} = formValues;

    const closeModal = () =>{
        dispatch(uiCloseModalDoc());
    }

    //modif
    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(formValues);
        let image = formValues.image;
        if (!image) {
                Swal.fire('Error', "Please paste the URL Image", 'error');
                return;
            }
        
        //console.log("image: " + image)
        //console.log(formValues.image)
        //console.log("active: "+activeDoc.name+" image: "+ image+" id: "+ activeDoc.id)
        dispatch(updateBlogCards(activeDoc.name, image, activeDoc.id));
                
    }
    //------------------------------------------
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
                <h1 className="text-center">  { (activeDoc)? 'Update': 'New image' }</h1>
                <hr />
                <form className="container" onSubmit={handleSubmitForm}>

                    
                    <div className="form-group">
                        <label>Url</label>
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="https://drive.google.com/file/d/....."
                            name="image"
                            autoComplete="off"
                            //Editar esta cosa
                            //value={image}
                            
                            onChange={ handleInputChange }
                        />
                    </div>
                    <hr />
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Save </span>
                    </button>

                </form>
            </div>
        </Modal>
    )
}