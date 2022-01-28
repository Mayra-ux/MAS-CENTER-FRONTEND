import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from "material-table";
import { useState } from "react";
import { updateDash, deleteDash } from '../../actions/dash';
import createHistory from 'history/createBrowserHistory';
import { uiOpenModalDoc } from '../../actions/ui';
import { EditModal } from './EditModal';
import "./style.css"
import {docSetActive} from '../../actions/countries';
import { GetDash } from '../../selectors/getDash';

export const Dash = () => {

    const { role } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    GetDash();

    const data = useSelector( state => state.custom.dashb );

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
                {(role==="Admin" || role==="CoordDB")&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>DASHBOARDS</h1>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-success"  onClick={handleNew}>
                                <i class="fas fa-address-card"></i> New Dashboard
                            </button>
                        </div>
                    </div>
                }
                {(role==="Agente" || role==="AgenteDB" || role==="CoordQA" || role ==="RH" || role==="CoordCD")&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>Access Denied</h1>
                    </div>
                }
                <hr />
            </div>
            {(role==="Admin" || role==="RH" || role==="CoordQA" || role==="CoordDB" || role==="CoordCD")&&
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
                                dispatch(updateDash( name, image, index));
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
                                dispatch(deleteDash( dataUpdate._id));
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
