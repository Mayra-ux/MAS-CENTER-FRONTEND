import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustoms, getCustomsDocs } from "../actions/customs";

export const GetCustoms = (docs) =>{

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCustoms());
    }, [dispatch])
    return docs;
}
export const GetCustomsDocs = () =>{

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCustomsDocs());
    }, [dispatch])

    let customs = useSelector(state => state.paises.users);
    return customs;
}
