//add by Mayra

import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";

export const getBlogCarousel = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'BlogCarousel');
            const body = await resp.json();
            
            const bCarousel = body.blogCarousel;
            dispatch(blogCarouselLoaded(bCarousel));
            
        } catch (error) {
      
        }
    }
}

export const newBlogCarousel = ( position, image) => {
    return async( dispatch ) => {
        let image2 = image;
        image2 = image2.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image2 = image2.replace("/view?usp=sharing", "");
        image=image2;
        const resp = await fetchConToken( 'BlogCarousel', { position, image }, 'POST' );
        const body = await resp.json();
        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'Image Carousel successfully created!',
                'success'
              )
              window.location.reload();
        } else {
            Swal.fire('Error', body.error, 'error');
        }


    }
}

export const deleteBlogCarousel = ( id) => {
    return async( dispatch ) => {
        
        const resp = await fetchConToken( `BlogCarousel/${id}`, {id},'DELETE' );

        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            Swal.fire(
                'Deleted!',
                'Image Carousel successfully deleted!',
                'success'
              )
        } else {
            Swal.fire('Error', body.error, 'error');
        }
        window.location.reload();
    }
}

export const updateBlogCarousel = ( position, image, id) => {
    return async( dispatch ) => {

        console.log(position, image);

        let image2 = image;
        image2 = image2.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image2 = image2.replace("/view?usp=sharing", "");
        image=image2;
        const resp = await fetchConToken( `BlogCarousel/${id}`, ({ id, position, image }), 'PUT' );
        const body = await resp.json();
        console.log(body);
        if( body.ok ) {
            Swal.fire(
                'Saved!',
                'Image Carousel successfully created!',
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



const blogCarouselLoaded = (BlogCarousel) =>({
    type: types.blogCarouselLoaded,
    payload: BlogCarousel
})
