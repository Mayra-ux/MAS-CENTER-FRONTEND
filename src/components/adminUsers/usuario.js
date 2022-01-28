import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../selectors/getUsers';
import MaterialTable from "material-table";
import { useState } from "react";
import { userDelete, userUpdate } from '../../actions/auth';
import { NavLink } from 'react-router-dom'
import "./style.css"

export const Usuarios = () => {

    const { role } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const usuarios = GetUser();

    const data = usuarios;
    console.log(data);
    const [columns] = useState([
        { title: 'Name', field: 'name' },
        { title: 'Email', field: 'email', initialEditValue: 'initial edit value' },
        { title: 'Password', field: 'password'},
        {
          title: 'Role', field: 'role',
          lookup: { "Admin": 'Admin', "Agente": 'Agente',  "AgenteDB": 'Agente DB',  "CoordQA": 'Coord. QA', "CoordDB": 'Coord. DB', "CoordCD": 'Coord. CD', "RH": 'RH' , "PD Admin": 'PD Admin'},
        },
        {
            title: 'Status', field: 'status',
            lookup: { "Active": 'Active', "Suspended": 'Suspended',  "Vacations": 'Vacations'},
        },
        {
            title: 'Shift', field: 'shift',
            lookup: { "morning": 'morning', "midday": 'midday',  "afternoon": 'afternoon',  "night": 'night', "RRHH": "RRHH"},
        },
        {
            title: 'Hub', field: 'hub',
            lookup: { "MX": 'MX', "IN": 'IN', "BR": "BR"},
        },
        {
            title: 'BreakT', field: 'breakT',
            lookup: {   
                        "7:00": '7:00', 
                        "8:00": '8:00',
                        "9:00": '9:00', 
                        "10:00": '10:00', 
                        "11:00": '11:00',
                        "12:00": '12:00', 
                        "13:00": '13:00', 
                        "14:00": '14:00', 
                        "15:00": '15:00',
                        "16:00": '16:00', 
                        "17:00": '17:00',
                        "18:00": '18:00', 
                        "19:00": '19:00',
                        "20:00": '20:00', 
                        "21:00": '21:00',
                        "22:00": '22:00',},
        },
      ]);
    
    console.log("|"+role+"|");

    return (
        <div>
            <hr />
            <div className="container-fliud center text-center">
                {(role==="Admin" )&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>USERS</h1>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-success">
                                <NavLink to={`../../users/new`} className="stretched-link"style={{ color: 'white' }}><i class="fas fa-user-plus"></i> New user</NavLink>
                            </button>
                        </div>
                    </div>
                }
                {(role==="Agente" || role==="AgenteDB" || role==="RH" || role==="CoordQA" || role==="CoordDB" || role==="CoordCD")&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>Access Denied</h1>
                    </div>
                }
                <hr />
            </div>
            {(role==="Admin")&&
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
                                //console.log(dataUpdate);
                                //console.log(newData);
                                const { name, email, password, role, id, status, shift, hub, breakT} = newData;
                                dispatch(userUpdate( name, email, password, role, id, status, shift, hub, breakT));
                                resolve();
                                //history.go(0)
                                }, 1000)
                                
                            }),
                            onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                const index = oldData.tableData.id;
                                const dataUpdate = data[index];
                                //console.log(dataUpdate);
                                //console.log(dataUpdate.id);
                                dispatch(userDelete( dataUpdate.id));
                                resolve()
                                //history.go(0)
                                }, 1000)
                            }),
                        }}
                    />
                </div>
                }
            
        </div>
        
    )
}
