//add by Mayra

import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";

export const getBlogObsoleteRules = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'BlogObsoleteRules');
            const body = await resp.json();
            
            const obsoleteRules = body.blogObsoleteRules;
            dispatch(blogObsoleteRulesLoaded(obsoleteRules));
            
        } catch (error) {
      
        }
    }
}

export const newBlogObsoleteRules = ( date, image) => {
    return async( dispatch ) => {

        let image2 = image;
        image2 = image2.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image2 = image2.replace("/view?usp=sharing", "");
        //add by Mayra
        image=image2;

        const resp = await fetchConToken( 'BlogObsoleteRules', { date, image }, 'POST' );
        const body = await resp.json();
        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'Obsolete Rule successfully created!',
                'success'
              )
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }


    }
}

export const deleteBlogObsoleteRules = ( id) => {
    return async( dispatch ) => {
        
        const resp = await fetchConToken( `BlogObsoleteRules/${id}`, {id},'DELETE' );

        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            Swal.fire(
                'Deleted!',
                'Obsolete Rule successfully deleted!',
                'success'
              )
        } else {
            Swal.fire('Error', body.error, 'error');
        }
        window.location.reload();
    }
}

export const updateBlogObsoleteRules = ( date, image, id) => {
    return async( dispatch ) => {

        console.log(date, image, id);

        let image2 = image;
        image2 = image2.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image2 = image2.replace("/view?usp=sharing", "");
        image=image2;
        const resp = await fetchConToken( `BlogObsoleteRules/${id}`, ({ id, date, image}), 'PUT' );
        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'Obsolete Rule successfully updated!',
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



const blogObsoleteRulesLoaded = (BlogObsoleteRules) =>({
    type: types.blogObsoleteRulesLoaded,
    payload: BlogObsoleteRules
})