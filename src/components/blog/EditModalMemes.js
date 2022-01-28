//add by Mayra

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { newBlogMemes,deleteBlogMemes, updateBlogMemes} from '../../actions/blogMemes';
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
      
export const EditModalMemes = () => {
    const dispatch = useDispatch();
    const date= new Date();
    const year= date.getFullYear();
    

    let activeDoc = useSelector(state => state.memes.activeDoc);

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
    let date = formValues.date;
    if (!image) {
            Swal.fire('Error', "Please paste the URL Image", 'error');
            return;
    }
    if (!date) {
        Swal.fire('Error', "Please enter the date of memes image", 'error');
        return;
    }
    
    // console.log("image: " + image)
    // console.log(formValues.image)

    // console.log("active: "+activeDoc.name+" image: "+ image+" id: "+ activeDoc.id)
    if(activeDoc ===null){
        dispatch(newBlogMemes(date, image));
        
    }else{
        dispatch(updateBlogMemes(activeDoc.date, image, activeDoc.id));
        
    }
    
        
    

            
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

                    {<div className="form-group">
                        <label>Month</label>
                        <select className="form-control" name="date" onChange={ handleInputChange }>
                                <option selected>Select Month</option>
                                <option value={"01/01/"+date.getFullYear()}> January </option>
                                <option value={"02/01/"+date.getFullYear()}> February </option>
                                <option value={"03/01/"+date.getFullYear()}> March </option>
                                <option value={"04/01/"+date.getFullYear()}> April </option>
                                <option value={"05/01/"+date.getFullYear()}> May </option>
                                <option value={"06/01/"+date.getFullYear()}> June </option>
                                <option value={"07/01/"+date.getFullYear()}> July </option>
                                <option value={"08/01/"+date.getFullYear()}> August </option>
                                <option value={"09/01/"+date.getFullYear()}> September </option>
                                <option value={"10/01/"+date.getFullYear()}> October </option>
                                <option value={"11/01/"+date.getFullYear()}> November </option>
                                <option value={"12/01/"+date.getFullYear()}> December </option>
                            </select>
                </div>}
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