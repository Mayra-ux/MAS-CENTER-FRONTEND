import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../selectors/getUsers';
import moment from 'moment';
import "./style.css"

import { GetCheck, GetCheckE } from '../../selectors/getCheck';
import { CSVLink, CSVDownload } from "react-csv";
import DatePicker from 'react-date-picker';


let initEvent = {
    check: '', 
}

export const HoursPay = () => {
    const [formValues, setFormValues] = useState( initEvent );
    let [from, onChange] = useState(new Date());
    let [to, onChange2] = useState(new Date());

    const { role, uid } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    GetCheck();
    GetCheckE();

    const usuarios = GetUser();
    let userAdmin;

    try {
        userAdmin = usuarios.find(user => user.id === uid);
    } catch (error) {
        console.log("Hi");
    }
    
    const checks = useSelector(state => state.check.check);
    const checksE = useSelector(state => state.check.checkE);
    
    let checksFilter = checks.filter(checks=>  moment(from, "MM-DD-YYYY").diff(moment(checks.fecha, "MM-DD-YYYY")) <= 0 && moment(to, "MM-DD-YYYY").diff(moment(checks.fecha, "MM-DD-YYYY")) >= 0);
    let checksFilterE = checksE.filter(checks=>  moment(from, "MM-DD-YYYY").diff(moment(checks.fecha, "MM-DD-YYYY")) <= 0 && moment(to, "MM-DD-YYYY").diff(moment(checks.fecha, "MM-DD-YYYY")) >= 0 && checks.approval ==="Accepted");
    

    const handleSubmitForm2 = (e) => {
        e.preventDefault();
    }
    let total= moment(to, "MM-DD-YYYY").diff(moment(from, "MM-DD-YYYY"));
    total = ((total/3600000)/24);
    
    let fechas = [];
    let registros = [];
    let registrosExtras=[];
    fechas.push(moment(from, "MM-DD-YYYY"));
    let desde = from;
    
    for (let i = 0; i <= total ; i++) {
        if (i===0) {
            desde = moment(desde).add(0, 'day').format("MM-DD-YYYY")
            fechas.push(desde);

        }else{
            desde = moment(desde).add(1, 'day').format("MM-DD-YYYY")
            fechas.push(desde);
        }
    }
    
    fechas.shift();
    
    let tabla=[];
    let registro;
    
    if(usuarios){
        for (let i = 0; i < usuarios.length; i++) {
            if(usuarios[i].hub === userAdmin.hub){
                registros.push(usuarios[i].name);
                for (let j = 0; j < fechas.length; j++) {
                    registro = checksFilter.find(checks=> checks.fecha === fechas[j] && checks.uid === usuarios[i].id);
                    if (registro) {
                        registros.push(registro.total);
                    }else{
                        registros.push(0);
                    }
                }
                tabla.push(registros);
                registros = [];
            }
        }
    }
    
    if(usuarios){
        for (let i = 0; i < usuarios.length; i++) {
            if(usuarios[i].hub === userAdmin.hub){
                for (let j = 0; j < checksFilterE.length; j++) {
                    if (checksFilterE[j].uid === usuarios[i].id) {
                        registrosExtras.push({
                            name:usuarios[i].name, 
                            date: checksFilterE[j].fecha, 
                            total: checksFilterE[j].total
                        });
                    }
                }
            }
        }
    }
    //console.log(registrosExtras);
    return (
        <div>
            <hr />
            <div className="container-fliud center text-center">
                {(role==="Admin" || role==="Payroll"  )&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>HOURS TO PAY</h1>
                    </div>
                }
                {(role==="Agente" || role==="AgenteDB" || role==="RH" || role==="CoordQA" || role==="CoordDB" || role==="CoordCD")&&
                    <div>
                        <h1 className="text-center" style={{ color: '#ffffff' }}>Access Denied</h1>
                    </div>
                }
                <hr />
            </div>
            {(role==="Admin" || role==="Payroll" )&&
                    <div className=""> 
                        <form className="container" onSubmit={handleSubmitForm2}>
                            <div className="row">
                                <p className="col-lg-1" style={{ color: '#ffffff' }}>From</p>
                                <div className="col-lg-5">
                                    
                                    <DatePicker
                                    onChange={onChange}
                                    value={from}
                                    className="picker"
                                    />
                                </div>
                                <p className="col-lg-1" style={{ color: '#ffffff' }}>To</p>
                                <div className="col-lg-5">
                                    
                                    <DatePicker
                                    onChange={onChange2}
                                    value={to}
                                    className="picker"
                                    />
                                </div>
                            </div>
                        </form>
                        <div className="d-flex justify-content-center">
                            <button type="button" class="btn btn-success">
                                <i class="fas fa-file-csv"></i> 
                                <CSVLink 
                                    style={{ color: '#ffffff' }} 
                                    filename={"Checker.csv"} 
                                    data={tabla}>Download Checker
                                </CSVLink>
                                
                            </button>
                            <span />
                            <button type="button" class="btn btn-success">
                                <i class="fas fa-file-csv"></i> 
                                <CSVLink 
                                    style={{ color: '#ffffff' }} 
                                    filename={"Overtimes.csv"} 
                                    data={registrosExtras}>Download Overtimes
                                </CSVLink>
                            </button>
                        </div>
                    </div>
                }
        </div>
    )
}

