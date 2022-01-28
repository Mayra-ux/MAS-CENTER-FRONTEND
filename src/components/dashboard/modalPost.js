import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
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
    jobid: null,
}
    
    
export const EditModal = () => {
    const dispatch = useDispatch();

    let activeDoc = useSelector(state => state.paises.activeDoc);
    console.log(activeDoc);
    let usuario = useSelector(state => state.auth);
    let modalOpenDoc = useSelector(state => state.ui.modalOpenDoc);
    const [formValues, setFormValues] = useState( initEvent );

    let {jobid} = formValues;

    

    const closeModal = () =>{
        dispatch(uiCloseModalDoc());
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const request = new XMLHttpRequest();
        request.open("POST", "https://discord.com/api/webhooks/906252246092746792/ylOPHJg710puo8s56wNWxtGwsRn0aOeNOfrYpQ6yCdplm6Kjxsdo4S9VcYD35bGKvyyt");
        request.setRequestHeader('Content-type', 'application/json');
        const params = {
            username: "Diana pongase a jalar",
            avatar_url: "https://i.ytimg.com/vi/JQas1YbGBXo/hqdefault.jpg",
            content: ("*Envia:* "+usuario.name+`\n*Pais:* `+activeDoc.paisId+`\n*Tipo de doc:* `+activeDoc.type+`\n*JobID:* `+jobid+`\n*----------------* `)
        }
        request.send(JSON.stringify(params));
        dispatch(uiCloseModalDoc());
    }
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
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
                <h1 className="text-center">Report a doc</h1>
                <hr />
                <form onSubmit={handleSearch}>
                    <label>JobID</label>
                    <input 
                        type="text" 
                        placeholder="Job ID" 
                        className="form-control" 
                        name="jobid"
                        autoComplete="off"
                        value={jobid}
                        onChange={handleInputChange}
                    ></input>
                    <button type="submit" className="btn mt-2 btn-block btn-outline-primary">Send</button>
                </form>
            </div>
        </Modal>
    )
}
