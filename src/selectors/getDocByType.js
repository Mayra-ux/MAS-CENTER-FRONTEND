import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDocsType } from '../actions/countries';


export const GetDocByType = () =>{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDocsType());
    }, [dispatch])
    

    let docs = useSelector(state => state.paises.docs);
    
    return docs;
    


}
