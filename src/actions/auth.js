import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from 'sweetalert2';



export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch(login({
                uid: body.uid,
                name: body.name,
                role: body.role,
                status:body.status, 
                shift:body.shift, 
                hub:body.hub, 
                breakT:body.breakT
            }) )
        }else{
            Swal.fire('Error', body.error, 'error');
        }
        

    }
}

export const startRegister = ( email, password, name, role ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/new', { email, password, name, role }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'User successfully created!',
                'success'
              )
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }


    }
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name,
                role: body.role,
                status:body.status, 
                shift:body.shift, 
                hub:body.hub, 
                breakT:body.breakT
            }) )
        } else {
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
    }
}


const logout = () => ({ type: types.authLogout })

export const userUpdate = ( name, email, password, role, id, status, shift, hub, breakT) => {
    return async( dispatch ) => {

        const resp = await fetchConToken( `auth/${id}`, { name, email, password, role, status, shift, hub, breakT }, 'PUT' );
        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'User successfully created!',
                'success'
              )
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }
        

    }
}
export const userDelete = ( id) => {
    return async( dispatch ) => {
        
        const resp = await fetchConToken( `auth/${id}`, {id},'DELETE' );

        const body = await resp.json();

        if( body.ok ) {
            Swal.fire(
                'Deleted!',
                'User successfully deleted!',
                'success'
              )
            window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }
        

    }
}