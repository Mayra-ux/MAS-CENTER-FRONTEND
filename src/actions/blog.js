import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";


export const getUsers = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'custom');
            const body = await resp.json();
            
            const custom = body.customs;
            dispatch(customsLoaded(custom));
            
        } catch (error) {
            console.log ('no pude :v');
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

