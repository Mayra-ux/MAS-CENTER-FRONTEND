import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSR } from "../actions/countries";


export const GetSRByType = (type) =>{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSR());
    }, [dispatch])
    let docs = useSelector(state => state.paises.sr);

    return docs;

}
