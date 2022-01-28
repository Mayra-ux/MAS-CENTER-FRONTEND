import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";

export const getCountries = ( ) => {
    return async( dispatch ) => {

        
        try {
            const resp = await fetchConToken( 'paises');
            const body = await resp.json();

            const paises = body.paises;

            dispatch(paisLoaded(paises));
            
        } catch (error) {
      
        }
    }
}
export const getDocsType = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'documentos');
            const body = await resp.json();
            
            const docs = body.docs;

            dispatch(docsLoaded(docs));
            
        } catch (error) {
      
        }
    }
}
export const getSR = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'specialrules');
            const body = await resp.json();
            
            const sr = body.sr;

            dispatch(srLoaded(sr));
            
        } catch (error) {
      
        }
    }
}
const paisLoaded = (paises) =>({
    type: types.paisLoaded,
    payload: paises
})
const docsLoaded = (docs) =>({
    type: types.docLoaded,
    payload: docs
})

const srLoaded = (sr) =>({
    type: types.srLoaded,
    payload: sr
})

export const getUsers = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'auth');
            const body = await resp.json();
            
            const users = body.users;
            //console.log(body.users);
            dispatch(usersLoaded(users));
            
        } catch (error) {
      
        }
    }
}

const usersLoaded = (users) =>({
    type: types.authLoaded,
    payload: users
})

export const docSetActive = (doc) => ({
    type: types.docActive,
    payload: doc
})
export const srSetActive = (sr) => ({
    type: types.srActive,
    payload: sr
})

export const newDoc = ( country, type, image) => {
    return async( dispatch ) => {

        const resp = await fetchConToken( 'documentos', { country, type, image }, 'POST' );
        const body = await resp.json();
        
        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'Document successfully created!',
                'success'
              )
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }


    }
}

export const docDelete = ( id) => {
    return async( dispatch ) => {
        
        const resp = await fetchConToken( `documentos/${id}`, {id},'DELETE' );

        const body = await resp.json();
        
        if( body.ok ) {
            Swal.fire(
                'Deleted!',
                'Document successfully deleted!',
                'success'
              )
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }
    }
}

export const docUpdate = ( country, type, image, id) => {
    return async( dispatch ) => {
        console.log( country, type, image, id);
        const resp = await fetchConToken( `documentos/${id}`, { country, type, image }, 'PUT' );
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

export const srDelete = ( id) => {
    return async( dispatch ) => {
        
        const resp = await fetchConToken( `specialrules/${id}`, {id},'DELETE' );

        const body = await resp.json();
        
        if( body.ok ) {
            Swal.fire(
                'Deleted!',
                'Document successfully deleted!',
                'success'
              )
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }
    }
}

export const srUpdate = ( type, image, id) => {
    return async( dispatch ) => {
        console.log( type, image, id);
        const resp = await fetchConToken( `specialrules/${id}`, {  type, image }, 'PUT' );
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

export const newSR = ( type, image) => {
    return async( dispatch ) => {

        const resp = await fetchConToken( 'specialrules', {type, image }, 'POST' );
        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'Document successfully created!',
                'success'
              )
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }


    }
}