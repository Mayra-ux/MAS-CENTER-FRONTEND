import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/countries";


export const GetUser = (type) =>{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    let docs = useSelector(state => state.paises.users);
    //console.log(docs);
    return docs;

}
