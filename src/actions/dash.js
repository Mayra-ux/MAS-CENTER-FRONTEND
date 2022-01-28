import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";

export const getDash = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'dashb');
            const body = await resp.json();
            
            const custom = body.dashb;
            console.log(custom);
            dispatch(dashbLoaded(custom));
            
        } catch (error) {
      
        }
    }
}

export const newDash = ( name, image) => {
    return async( dispatch ) => {

        const resp = await fetchConToken( 'dashb', { name, image }, 'POST' );
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

export const deleteDash = ( id) => {
    return async( dispatch ) => {
        
        const resp = await fetchConToken( `dashb/${id}`, {id},'DELETE' );

        const body = await resp.json();
        console.log(body);
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

export const updateDash = ( name, image, id) => {
    return async( dispatch ) => {

        console.log(name, image);
        let image2 = image;
        image2 = image2.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image2 = image2.replace("/view?usp=sharing", "");
        image = image2;
        const resp = await fetchConToken( `dashb/${id}`, { name, image }, 'PUT' );
        const body = await resp.json();
        console.log(image);
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
export const getDashDocs = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'dashDocs');
            const body = await resp.json();
            console.log(body);
            const custom = body.docs;
            console.log(custom);
            dispatch(ddLoaded(custom));
            
        } catch (error) {
      
        }
    }
}

export const updateDashDoc= ( dashboard, type, image, id) => {
    return async( dispatch ) => {

        console.log(dashboard);
        const resp = await fetchConToken( `dashDocs/${id}`, {  type, image, dashboard }, 'PUT' );
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

export const newDashDoc = (type, image, dashboard) => {
    return async( dispatch ) => {

        const resp = await fetchConToken( 'dashDocs', { type:type, image:image, dashboard:dashboard}, 'POST' );
        const body = await resp.json();
        console.log(type);
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

export const deleteDashDoc = ( id) => {
    return async( dispatch ) => {
        
        const resp = await fetchConToken( `dashDocs/${id}`, {id},'DELETE' );

        const body = await resp.json();
        console.log(body);
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
const dashbLoaded = (dash) =>({
    type: types.dashbLoaded,
    payload: dash
})
const ddLoaded = (dash) =>({
    type: types.ddLoaded,
    payload: dash
})