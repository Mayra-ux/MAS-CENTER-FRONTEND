import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModalBug } from '../../actions/ui';
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
    comment: null,
    type: null,
}
    
    
export const EditModal = () => {
    const dispatch = useDispatch();

    let activeDoc = useSelector(state => state.paises.activeDoc);
    console.log(activeDoc);
    let usuario = useSelector(state => state.auth);
    let modalOpenBug = useSelector(state => state.ui.modalOpenBug);
    const [formValues, setFormValues] = useState( initEvent );

    let {comment, type} = formValues;

    

    const closeModal = () =>{
        dispatch(uiCloseModalBug());
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const request = new XMLHttpRequest();
        request.open("POST", "https://discord.com/api/webhooks/908832213158756404/zFO-B-qafrDiSBQsrcQjuQm4OwAHWsEcJdIMGp_MCP-xcsqHXhm3OBhjLgKDJYSbsUJS");
        request.setRequestHeader('Content-type', 'application/json');
        const params = {
            username: "Carlos pongase a jalar",
            avatar_url: "https://i.ytimg.com/vi/JQas1YbGBXo/hqdefault.jpg",
            content: ("*Envia:* "+usuario.name+`\n*type:* `+type+`\n*Comment:* `+comment+`\n*----------------* `)
        }
        request.send(JSON.stringify(params));
        dispatch(uiCloseModalBug());
    }
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    return (
        <Modal
            isOpen={modalOpenBug}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo">
            <div>
                <h1 className="text-center">Report a Bug</h1>
                <hr />
                <form onSubmit={handleSearch}>
                    <label>Type</label>
                        <select className="form-control" name="type" onChange={ handleInputChange }>
                            <option selected>Select type</option>
                            <option value="Broken images"> Broken images </option>
                            <option value="Platform failure"> Platform failure </option>
                            <option value="Slow charge"> Slow charge </option>
                            <option value="Others"> Others </option>
                        </select>
                    <label>Comment</label>
                    <input 
                        type="text" 
                        placeholder="Comment" 
                        className="form-control" 
                        name="comment"
                        autoComplete="off"
                        value={comment}
                        onChange={handleInputChange}
                    ></input>
                    <button type="submit" className="btn mt-2 btn-block btn-outline-primary">Send</button>
                </form>
            </div>
        </Modal>
    )
}
