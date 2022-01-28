//add by Mayra

import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";

export const getBlogErizo = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'erizo');
            const body = await resp.json();
            
            const bErizo = body.erizo;
            dispatch(blogErizoLoaded(bErizo));
            
        } catch (error) {
      
        }
    }
}

export const newBlogErizo = ( date, image) => {
    return async( dispatch ) => {
        let image2 = image;
        image2 = image2.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image2 = image2.replace("/view?usp=sharing", "");
        //add by Mayra
        image=image2;
        const resp = await fetchConToken( 'erizo', { date, image }, 'POST' );
        const body = await resp.json();

        console.log(body);

        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'Image successfully created!',
                'success'
              )
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }


    }
}

export const deleteBlogErizo = ( id) => {
    return async( dispatch ) => {
        
        const resp = await fetchConToken( `erizo/${id}`, {id},'DELETE' );

        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            Swal.fire(
                'Deleted!',
                'Image successfully deleted!',
                'success'
              )
        } else {
            Swal.fire('Error', body.error, 'error');
        }
        window.location.reload();
    }
}

export const updateBlogErizo = ( date, image, id) => {
    return async( dispatch ) => {

        console.log(date, image);

        let image2 = image;
        image2 = image2.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image2 = image2.replace("/view?usp=sharing", "");
        //add by Mayra
        image=image2;
        const resp = await fetchConToken( `erizo/${id}`, ({ id, date, image }), 'PUT' );
        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'Image successfully created!',
                'success'
              )
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }
        

    }
}

export const docSetActive = (doc) => ({
    type: types.docActive,
    payload: doc
})


const blogErizoLoaded = (erizo) =>({
    type: types.blogErizoLoaded,
    payload: erizo
})