import React, { useState } from 'react';
import Clock from 'react-live-clock';
import { useDispatch, useSelector } from 'react-redux';
import "./styles.css";
import moment from 'moment';
import Swal from "sweetalert2";

import { GetCheck, GetCheckE } from '../../selectors/getCheck';
import { newCheck, newCheckE, updateCheck, updateCheckE } from '../../actions/checker';
import { GetUser } from '../../selectors/getUsers';
import DatePicker from 'react-date-picker';

let initEvent = {
    check: '', 
}
export const Checker = () =>{
    const dispatch = useDispatch();
    GetCheck();
    GetCheckE();

    
        
    const checks = useSelector(state => state.check.check);
    const checksE = useSelector(state => state.check.checkE);
    let user = useSelector( state => state.auth );
    //console.log(user);

    let usuarios = GetUser();
    
    if(usuarios){
        usuarios = usuarios.filter(checks=> checks.id === user.uid);
    }
    

    let myChecks = checks.filter(checks=> checks.uid === user.uid);
    let myChecksE = checksE.filter(checksE=> checksE.uid === user.uid);


    const [formValues, setFormValues] = useState( initEvent );
    let [from, onChange] = useState(new Date());
    let [to, onChange2] = useState(new Date());

    let checksFilter = myChecks.filter(checks=>  moment(from, "MM-DD-YYYY").diff(moment(checks.fecha, "MM-DD-YYYY")) <= 0 && moment(to, "MM-DD-YYYY").diff(moment(checks.fecha, "MM-DD-YYYY")) >= 0);
    let checksFilterE = myChecksE.filter(checks=>  moment(from, "MM-DD-YYYY").diff(moment(checks.fecha, "MM-DD-YYYY")) <= 0 && moment(to, "MM-DD-YYYY").diff(moment(checks.fecha, "MM-DD-YYYY")) >= 0);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        let time;
        let fecha;
        let hora2;
        let dia;

        if (usuarios[0].hub === "MX") {
            time = moment().tz("America/Mexico_City").format("MM-DD-YYYY HH:mm:ss");
            fecha = moment().tz("America/Mexico_City").format("MM-DD-YYYY");
            hora2 = moment().tz("America/Mexico_City").format("HH");
            dia = moment().add(1, 'day').tz("America/Mexico_City").format("MM-DD-YYYY"); 
        }
        if (usuarios[0].hub === "IN") {
            time = moment().tz("Asia/Calcutta").format("MM-DD-YYYY HH:mm:ss");
            fecha = moment().tz("Asia/Calcutta").format("MM-DD-YYYY");
            hora2 = moment().tz("Asia/Calcutta").format("HH");
            dia = moment().add(1, 'day').tz("Asia/Calcutta").format("MM-DD-YYYY"); 
        }
        if (usuarios[0].hub === "BR") {
            time = moment().tz("America/Sao_Paulo").format("MM-DD-YYYY HH:mm:ss");
            fecha = moment().tz("America/Sao_Paulo").format("MM-DD-YYYY");
            hora2 = moment().tz("America/Sao_Paulo").format("HH");
            dia = moment().add(1, 'day').tz("America/Sao_Paulo").format("MM-DD-YYYY"); 
        }
        
        if(formValues.check === "Check-In"){
            let repetido = myChecks.find(checks=> checks.fecha === fecha);
            //console.log(repetido);
            if(repetido){
                //Ya ha hecho check in
                Swal.fire('No!','You have already checked-in at '+repetido.checkin,'error');
            }else{
                //No ha hecho check in
                if(hora2 === "23"){
                    Swal.fire('Welcome!','You checkIn at '+time,'success');
                    dispatch(newCheck( user.uid, dia, time, "", "", "", "", ""));
                }else{
                    Swal.fire('Welcome!','You checkIn at '+time,'success');
                    dispatch(newCheck( user.uid, fecha, time, "", "", "", "", ""));
                }
            }
        }
        if(formValues.check === "Emergency-In"){
            dispatch(newCheckE( user.uid, fecha, time, "", 0, "Pending", ""));
        }
        if(formValues.check === "Emergency-Out"){
            let repetido = myChecksE.find(checks=> checks.fecha === fecha && checks.total ===0);
            let diaAtras = moment(fecha).add(-1, 'day').format("MM-DD-YYYY");
            console.log(repetido.length);
            
            if(repetido){
                if (repetido.checkout.length === 0) {
                    let total= moment(time, "MM-DD-YYYY HH:mm:ss").diff(moment(repetido.checkin, "MM-DD-YYYY HH:mm:ss"));
                    total = (total/3600000);
                    Swal.fire('Thanks!','Thank you for your support!','success');
                    dispatch(updateCheckE( repetido.id, user.uid, repetido.fecha, repetido.checkin, time, total, "Pending", ""));
                }else{
                    Swal.fire('Error!','You have already made chekout','error');
                }
            }else{
                repetido = myChecksE.find(checks=> checks.fecha === diaAtras && checks.total ===0);
                let total= moment(time, "MM-DD-YYYY HH:mm:ss").diff(moment(repetido.checkin, "MM-DD-YYYY HH:mm:ss"));
                total = (total/3600000);
                if(repetido){
                    if (repetido.checkout.length === 0) {
                        Swal.fire('Thanks!','Thank you for your support!','success');
                        dispatch(updateCheckE( repetido.id, user.uid, repetido.fecha, repetido.checkin, time, total, "Pending", ""));
                    }else{
                        Swal.fire('Error!','You have already made chekout','error');
                    }
                }
            }
            
        }
        if(formValues.check === "Check-Out" || formValues.check === "Break" || formValues.check === "Return" ){
            let repetido = myChecks.find(checks=> checks.fecha === fecha);

            if(repetido){
                
                if (formValues.check === "Return") {
                    //si guardar
                    if (repetido.returnC.length === 0) {
                        //No guardar
                        if (repetido.breakC.length === 0) {
                            Swal.fire('No!','You did not go out to break','error');
                        }
                        //si guardar
                        else{
                            let total= moment(time, "MM-DD-YYYY HH:mm:ss").diff(moment(repetido.breakC, "MM-DD-YYYY HH:mm:ss"));
                            console.log(total);
                            total = (total/3600000);
                            console.log(total);
                            Swal.fire('Welcome back!','Welcome back. Success on your turn','success');
                            dispatch(updateCheck(repetido.id, user.uid, repetido.fecha, repetido.checkin, repetido.checkout, repetido.breakC, time, total, repetido.total));
                        }
                    }
                    //No guardar
                    else{
                        Swal.fire('No!','You have already made return','error');
                    }
                }

                if (formValues.check === "Break" ) {
                    //si guardar
                    if (repetido.breakC.length === 0) {
                        Swal.fire('See you!','Enjoy your break','success');
                        dispatch(updateCheck(repetido.id, user.uid, repetido.fecha, repetido.checkin, repetido.checkout, time, repetido.returnC, repetido.totalB, repetido.total));
                    }
                    //No guardar
                    else{
                        Swal.fire('No!','You are already in break','error');
                    }
                }

                if (formValues.check === "Check-Out") {
                    //si guardar
                    if (repetido.checkout.length === 0) {
                        let total= moment(time, "MM-DD-YYYY HH:mm:ss").diff(moment(repetido.checkin, "MM-DD-YYYY HH:mm:ss"));
                        console.log(total);
                        total = (total/3600000);
                        console.log(total)
                        total = total - repetido.totalB;
                        Swal.fire('See you tomorrow!','Have a good rest!','success');
                        dispatch(updateCheck(repetido.id, user.uid, repetido.fecha, repetido.checkin, time, repetido.breakC, repetido.returnC, repetido.totalB, total));
                    }
                    //No guardar
                    else{
                        Swal.fire('No!','Your turn is over','error');
                    }
                }
                
            }else{
                //No guardar
                if (hora2==="00") {
                    
                    let diaAtras = moment(fecha).add(-1, 'day').format("MM-DD-YYYY");
                    console.log(diaAtras);
                    let repetido = myChecks.find(checks=> checks.fecha === diaAtras);

                    if (formValues.check === "Check-Out") {
                        //si guardar
                        if (repetido.checkout.length === 0) {
                            let total= moment(time, "MM-DD-YYYY HH:mm:ss").diff(moment(repetido.checkin, "MM-DD-YYYY HH:mm:ss"));
                            console.log(total);
                            total = (total/3600000);
                            console.log(total)
                            Swal.fire('Welcome back!','Welcome back. Success on your turn','success');
                            dispatch(updateCheck(repetido.id, user.uid, repetido.fecha, repetido.checkin, time, repetido.breakC, repetido.returnC, repetido.totalB, total));
                        }
                        //No guardar
                        else{
                            Swal.fire('No!','Your turn is over','error');
                        }
                    }
                }
            }
        }
    }
    const handleSubmitForm2 = (e) => {
        e.preventDefault();
    }

    return(
        <div className="container-fluid  animate__animated animate__fadeIn mt-2">
            <hr />
            <h1 className="text-center" style={{ color: '#ffffff' }}>MASCHECKER</h1>
            <hr />

            <div className="row ">
                <div className="col-4">
                    <h4 style={{ color: '#ffffff' }}>Checker</h4>
                    <hr /> 
                    {(!usuarios)&&
                        <Clock className="d-flex justify-content-center reloj" format={'HH:mm:ss'} ticking={true} timezone={'us/central'} />
                    }
                    {(usuarios && (usuarios[0].hub==="MX"))&&
                        <Clock className="d-flex justify-content-center reloj" format={'HH:mm:ss'} ticking={true} timezone={'us/central'} />
                    }
                    {(usuarios && (usuarios[0].hub==="IN"))&&
                        <Clock className="d-flex justify-content-center reloj" format={'HH:mm:ss'} ticking={true} timezone={'Asia/Calcutta'} />
                    }
                    {(usuarios && (usuarios[0].hub==="BR"))&&
                        <Clock className="d-flex justify-content-center reloj" format={'HH:mm:ss'} ticking={true} timezone={'America/Sao_Paulo'} />
                    }
                    {(!usuarios)&&
                        <form className="container" onSubmit={handleSubmitForm}>
                            <div className="form-group">
                                <select className="form-control" name="check"  onChange={ handleInputChange }>
                                    <option selected>Select a check</option>
                                    <option value="Check-In"> Check-In </option>
                                    <option value="Check-Out"> Check-Out </option>
                                    <option value="Emergency-In"> Emergency-In </option>
                                    <option value="Emergency-Out"> Emergency-Out </option>
                                    <option value="Break"> Break </option>
                                    <option value="Return"> Return </option>
                                </select>
                            </div>
                            <hr />
                            <button
                                type="submit"
                                className="btn btn-outline-primary btn-block">
                                <i className="far fa-save"></i>
                                <span> Save </span>
                            </button>
    
                        </form>
                        
                    }
                    {(usuarios && usuarios[0].status === "Active")&&
                        <form className="container" onSubmit={handleSubmitForm}>
                            <div className="form-group">
                                <select className="form-control" name="check"  onChange={ handleInputChange }>
                                    <option selected>Select a check</option>
                                    <option value="Check-In"> Check-In </option>
                                    <option value="Check-Out"> Check-Out </option>
                                    <option value="Emergency-In"> Emergency-In </option>
                                    <option value="Emergency-Out"> Emergency-Out </option>
                                    <option value="Break"> Break </option>
                                    <option value="Return"> Return </option>
                                </select>
                            </div>
                            <hr />
                            <button
                                type="submit"
                                className="btn btn-outline-primary btn-block">
                                <i className="far fa-save"></i>
                                <span> Save </span>
                            </button>
    
                        </form>
                        
                    }
                    {(usuarios && usuarios[0].status !== "Active")&&
                        <h4 style={{ color: '#ffffff' }}> You cannot use the checker, until You are off of your {usuarios[0].status} Period</h4>
                    } 
                    
                </div>
                <div className="col-8">
                    <h4 style={{ color: '#ffffff' }}>My hours</h4>
                    <hr />
                    <form className="container" onSubmit={handleSubmitForm2}>
                    <div className="row">
                        
                            <div className="col-sm-4">
                                <p style={{ color: '#ffffff' }}>From</p>
                                <DatePicker
                                onChange={onChange}
                                value={from}
                                className="picker"
                                />
                            </div>
                            <div className="col-sm-4">
                                <p style={{ color: '#ffffff' }}>To</p>
                                <DatePicker
                                onChange={onChange2}
                                value={to}
                                className="picker"
                                />
                            </div>
                    </div>
                    </form>
                    <table class="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Day</th>
                            <th scope="col">Hours</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    {
                        checksFilter.map(check => {
                            return ( 
                                <tr>
                                    <td>{check.fecha}</td>
                                    <td>{check.total}</td>
                                    {(check.total=== null)&&
                                       <td>You are already active</td> 
                                    }
                                    {(check.total >= 8)&&
                                       <td>Exceeded 8 hours per day, the excess will not be paid until authorized by the supervisor.</td> 
                                    }
                                </tr>
                            )
                        })
                    }
                    </table>
                    <h4 style={{ color: '#ffffff' }}>Overtime</h4>
                    <hr />
                    <table class="table table-dark">
                        <tr>
                            <th scope="col">Day</th>
                            <th scope="col">Hours</th>
                            <th scope="col">Status</th>
                        </tr>
                    {
                        checksFilterE.map(check => {
                            return ( 
                                <tr>
                                    <td>{check.fecha}</td>
                                    <td>{check.total}</td>
                                    <td>{check.approval}</td>
                                </tr>
                            )
                        })
                    }
                    </table>
                </div>
            </div>
        </div>
    )
}