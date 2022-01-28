import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetCustoms } from '../../selectors/getCustoms';
import MaterialTable from "material-table";
import { useState } from "react";
import { deleteCustom, updateCustom } from '../../actions/customs';
import createHistory from 'history/createBrowserHistory';
import { uiOpenModalDoc } from '../../actions/ui';
import { EditModal } from './EditModal';
import "./style.css"
import {docSetActive} from '../../actions/countries';

export const Customs = () => {

    const { role } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    GetCustoms();

    const data = useSelector( state => state.custom.customs );

    const [columns] = useState([
        { title: 'Name', field: 'name' },
        { title: 'Image', field: 'image' }
      ]);
    
    const history = createHistory();

    const handleNew= (e) =>{
    dispatch(docSetActive(null));
    dispatch(uiOpenModalDoc());
}

    return (
        <div>
            <hr />
            <div className="container-fliud center text-center">
                {(role==="Admin" || role==="CoordCD")&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>CUSTOM DOCUMENTS</h1>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-success"  onClick={handleNew}>
                                <i class="fas fa-address-card"></i> New Custom Document
                            </button>
                        </div>
                    </div>
                }
                {(role==="Agente" || role==="AgenteDB" || role==="CoordQA" || role==="CoordDB" || role ==="RH")&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>Access Denied</h1>
                    </div>
                }
                <hr />
            </div>
            {(role==="Admin" || role==="CoordCD")&&
                    <div> 
                    <MaterialTable
                        className="usuarios-table"
                        options={{
                            rowStyle:{backgroundColor:'#f2f2f2'},
                            headerStyle:{backgroundColor:'#f2f2f2'},
                            actionsCellStyle:{backgroundColor:'#f2f2f2'},
                            style:{backgroundColor:'#f2f2f2'}
                            }}
                        style={{backgroundColor:'#f2f2f2'}}
                        title=""
                        columns={columns}
                        data={data}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                const { name, image} = newData;
                                const index = newData._id;
                                console.log(name, image, index);
                                dispatch(updateCustom( name, image, index));
                                resolve();
                                //history.go(0)
                                }, 1000)
                                
                            }),
                            onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                const index = oldData.tableData.id;
                                const dataUpdate = data[index];
                                console.log(dataUpdate);
                                dispatch(deleteCustom( dataUpdate._id));
                                resolve()
                                //history.go(0)
                                }, 1000)
                            }),
                        }}
                    />
                </div>
                }
            <EditModal />
        </div>
        
    )
}
