//add by Mayra

import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";

export const getBlogCards = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken('blogCards');
            const body = await resp.json();
            
            const bc = body.blogCard;
            console.log("bc: " + bc)
            dispatch(blogCardsLoaded(bc));
            
        } catch (error) {
      
        }
    }
}

// export const newCustom = ( name, image) => {
//     return async( dispatch ) => {

//         const resp = await fetchConToken( 'blogCards', { name, image }, 'POST' );
//         const body = await resp.json();
//         if( body.ok ) {
//             Swal.fire(
//                 'Saved!',
//                 'Document successfully created!',
//                 'success'
//               )
//               window.location.reload();
//         } else {
//             Swal.fire('Error', body.error, 'error');
//         }


//     }
// }

// export const deleteCustom = ( id) => {
//     return async( dispatch ) => {
        
//         const resp = await fetchConToken( `blogCards/${id}`, {id},'DELETE' );

//         const body = await resp.json();
//         console.log(body);
//         if( body.ok ) {
//             Swal.fire(
//                 'Deleted!',
//                 'Document successfully deleted!',
//                 'success'
//               )
//         } else {
//             Swal.fire('Error', body.error, 'error');
//         }
//         window.location.reload();
//     }
// }

export const updateBlogCards = ( name, image, id) => {
    return async( dispatch ) => {

        console.log(name, image);

        let image2 = image;
        image2 = image2.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image2 = image2.replace("/view?usp=sharing", "");
        // add by Mayra
        image=image2;
        console.log("la imagen es: "+image2);
        const resp = await fetchConToken( `blogCards/${id}`, ({ id, name, image }), 'PUT' );
        const body = await resp.json();
        console.log("body: "+JSON.stringify(body));
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

export const docSetActive = (doc) => ({
    type: types.docActive,
    payload: doc
})



const blogCardsLoaded = (blogCards) =>({
    type: types.blogCardsLoaded,
    payload: blogCards
})
