//add by Mayra

import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";

export const getBlogSpecialRules = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'BlogSpecialRules');
            const body = await resp.json();
            console.log(body);

            const specialRules = body.blogSpecialRules; //respuesta JSON 
            dispatch(blogSpecialRulesLoaded(specialRules));
            
        } catch (error) {
      
        }
    }
}

export const newBlogSpecialRules = ( date, image) => {
    return async( dispatch ) => {

        let image2 = image;
        image2 = image2.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image2 = image2.replace("/view?usp=sharing", "");
        //add by Mayra
        image=image2;

        const resp = await fetchConToken( 'BlogSpecialRules', { date, image }, 'POST' );
        const body = await resp.json();
        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'Special Rule successfully created!',
                'success'
              )
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }


    }
}

export const deleteBlogSpecialRules = ( id) => {
    return async( dispatch ) => {
        
        const resp = await fetchConToken( `BlogSpecialRules/${id}`, {id},'DELETE' );

        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            Swal.fire(
                'Deleted!',
                'Special Rule successfully deleted!',
                'success'
              )
        } else {
            Swal.fire('Error', body.error, 'error');
        }
        window.location.reload();
    }
}

export const updateBlogSpecialRules = ( date, image, id) => {
    return async( dispatch ) => {

        console.log(date, image , id);

        let image2 = image;
        image2 = image2.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image2 = image2.replace("/view?usp=sharing", "");
        image=image2;
        const resp = await fetchConToken( `BlogSpecialRules/${id}`, ({ id, date, image}), 'PUT' );
        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'Special Rule successfully updated!',
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


const blogSpecialRulesLoaded = (BlogSpecialRules) =>({
    type: types.blogSpecialRulesLoaded,
    payload: BlogSpecialRules
})