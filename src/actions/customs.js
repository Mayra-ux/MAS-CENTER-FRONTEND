import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";

export const getCustoms = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'custom');
            const body = await resp.json();
            
            const custom = body.customs;
            dispatch(customsLoaded(custom));
            
        } catch (error) {
      
        }
    }
}

export const newCustom = ( name, image) => {
    return async( dispatch ) => {

        const resp = await fetchConToken( 'custom', { name, image }, 'POST' );
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

export const deleteCustom = ( id) => {
    return async( dispatch ) => {
        
        const resp = await fetchConToken( `custom/${id}`, {id},'DELETE' );

        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            Swal.fire(
                'Deleted!',
                'Document successfully deleted!',
                'success'
              )
        } else {
            Swal.fire('Error', body.error, 'error');
        }
        window.location.reload();
    }
}

export const updateCustom = ( name, image, id) => {
    return async( dispatch ) => {

        console.log(name, image);

        let image2 = image;
        image2 = image2.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image2 = image2.replace("/view?usp=sharing", "");
        const resp = await fetchConToken( `custom/${id}`, ({ id, name, image2 }), 'PUT' );
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

export const getCustomsDocs = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'customDocs');
            const body = await resp.json();
            
            const custom = body.docs;
            dispatch(cdLoaded(custom));
            
        } catch (error) {
      
        }
    }
}

export const updateCustomDoc= ( typeCustom, type, image, id) => {
    return async( dispatch ) => {

        //console.log(typeCustom, type, image, id);
        const resp = await fetchConToken( `customDocs/${id}`, {  type, image, typeCustom }, 'PUT' );
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

export const newCustomDoc = (type, image, typeCustom) => {
    return async( dispatch ) => {

        const resp = await fetchConToken( 'customDocs', { type:type, image:image, typeCustom:typeCustom   }, 'POST' );
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

export const deleteCustomDoc = ( id) => {
    return async( dispatch ) => {
        
        const resp = await fetchConToken( `customDocs/${id}`, {id},'DELETE' );

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

const customsLoaded = (customs) =>({
    type: types.customLoaded,
    payload: customs
})
const cdLoaded = (customs) =>({
    type: types.cdLoaded,
    payload: customs
})