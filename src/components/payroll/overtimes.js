import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../selectors/getUsers';
import MaterialTable from "material-table";
import { useState } from "react";
import { updateCheckE } from '../../actions/checker';
import "./style.css"
import { GetCheckE } from '../../selectors/getCheck';
export const Overtimes = () => {

    const { role, name, uid } = useSelector( state => state.auth );
    GetCheckE();
    let usuarios = GetUser();
    let checksE = useSelector(state => state.check.checkE);
    usuarios = useSelector(state => state.paises.users);
    const dispatch = useDispatch();
    let arrayHrs =[];
    let userAdmin;
    try {
        userAdmin = usuarios.find(user => user.id === uid);
    } catch (error) {
        console.log("Hi");
    }

    //console.log(userAdmin);

    checksE.map(check => {
        if (usuarios !== undefined) {
            for (let i = 0; i < usuarios.length; i++) {
                if (check.uid === usuarios[i].id &&  usuarios[i].hub === userAdmin.hub) {
                    const obj = {"id": check.id , "name": usuarios[i].name, "fecha": check.fecha, "total": check.total, "approval": check.approval};
                    arrayHrs.push(obj); 
                }
            } 
        }
    })  
    const data = arrayHrs;

    const [columns] = useState([
        { title: 'Worker', field: 'name'},
        { title: 'Date', field: 'fecha'},
        { title: 'Total Hrs', field: 'total'},
        { title: 'Approval', field: 'approval',
        lookup: { "Accepted": 'Accepted', "Rejected": 'Rejected', "Pending": 'Pending'}
        },
        
      ]);
    
    console.log("|"+role+"|");

    return (
        <div>
            <hr />
            <div className="container-fliud center text-center">
                {(role==="Admin"|| role==="Payroll" )&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>OVERTIME TO AUTHORIZE</h1>
                    </div>
                }
                {(role==="Agente" || role==="AgenteDB" || role==="RH" || role==="CoordQA" || role==="CoordDB" || role==="CoordCD")&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>Access Denied</h1>
                    </div>
                }
                <hr />
            </div>
            {(role==="Admin" || role==="Payroll")&&
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
                                console.log(newData);
                                const {id, total, approval} = newData;
                                let registro = checksE.find(checks=> checks.id === id);
                                dispatch(updateCheckE( id, registro.uid, registro.fecha, registro.checkin, registro.checkout, registro.total, approval, name ));
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
                                //dispatch(userDelete( dataUpdate.id));
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
