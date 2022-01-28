import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";

export const getCheck = () => {
    return async( dispatch ) => {
   
        try {
            const resp = await fetchConToken( `check` );
            const body = await resp.json();
            console.log(body);
            const checks = body.check;

            dispatch(checkloads(checks));
            
        } catch (error) {
      
        }
    }
}
const checkloads = (checks) =>({
    type: types.checkloads,
    payload: checks
})
export const getCheckE = () => {
    return async( dispatch ) => {
        console.log("Extras");
        try {
            const resp = await fetchConToken( `checkE` );
            const body = await resp.json();
            console.log(body);
            const checksE = body.check;


            dispatch(checkloadsE(checksE));
            
        } catch (error) {
      
        }
    }
}
const checkloadsE = (checksE) =>({
    type: types.checkExtrasloads,
    payload: checksE
})

export const newCheck = ( uid, fecha, checkin, checkout, breakC, returnC, totalB, total) => {
    return async( dispatch ) => {
        const resp = await fetchConToken( 'check', { uid, fecha, checkin, checkout, breakC, returnC, totalB, total }, 'POST' );
        const body = await resp.json();
        console.log(uid);
        if( body.ok ) {
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }


    }
}

export const newCheckE = ( uid, fecha, checkin, checkout, total, approval, sup) => {
    return async( dispatch ) => {
        console.log("Extra");
        const resp = await fetchConToken( 'checkE', { uid, fecha, checkin, checkout, total, approval, sup }, 'POST' );
        const body = await resp.json();
        console.log(uid);
        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'Chekin!',
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

export const updateCheck = (id, uid, fecha, checkin, checkout, breakC, returnC, totalB, total) => {
    return async( dispatch ) => {
        
        const resp = await fetchConToken( `check/${id}`, { uid, fecha, checkin, checkout, breakC, returnC, totalB, total }, 'PUT' );
        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }
        

    }
}
export const updateCheckE = (id, uid, fecha, checkin, checkout, total, approval, sup) => {
    return async( dispatch ) => {
        console.log(id, uid, fecha, checkin, checkout, total, approval, sup);
        const resp = await fetchConToken( `checkE/${id}`, { uid, fecha, checkin, checkout, total, approval, sup}, 'PUT' );
        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }
        

    }
}
