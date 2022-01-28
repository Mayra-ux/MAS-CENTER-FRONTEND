//add by Mayra

import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";

export const getBlogMemes = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'BlogMemes');
            const body = await resp.json();
            
            const memes = body.blogMemes;
            console.log("Memes: " + JSON.stringify( memes))
            dispatch(blogMemesLoaded(memes));
            
        } catch (error) {
      
        }
    }
}

export const newBlogMemes = ( date, image) => {
    return async( dispatch ) => {
        let image2 = image;
        image2 = image2.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image2 = image2.replace("/view?usp=sharing", "");
        //add by Mayra
        image=image2;

        const resp = await fetchConToken( 'BlogMemes', { date, image }, 'POST' );
        const body = await resp.json();
        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'Meme successfully created!',
                'success'
              )
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }


    }
}

export const deleteBlogMemes = ( id) => {
    return async( dispatch ) => {
        
        const resp = await fetchConToken( `BlogMemes/${id}`, {id},'DELETE' );

        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            Swal.fire(
                'Deleted!',
                'Meme successfully deleted!',
                'success'
              )
        } else {
            Swal.fire('Error', body.error, 'error');
        }
        window.location.reload();
    }
}

export const updateBlogMemes = ( date, image, id) => {
    return async( dispatch ) => {
        console.log("entra a update blog memes/action")
        debugger;
        console.log(date, image);

        let image2 = image;
        image2 = image2.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image2 = image2.replace("/view?usp=sharing", "");
        //add Mayra
        image=image2
        const resp = await fetchConToken( `BlogMemes/${id}`, ({ id, date, image }), 'PUT' );
        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'Meme successfully updated!',
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


const blogMemesLoaded= (BlogMemes) =>({
    type: types.blogMemesLoaded,
    payload: BlogMemes
})