import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDash, getDashDocs } from "../actions/dash";

export const GetDash = (docs) =>{

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDash());
    }, [dispatch])

    let customs = useSelector(state => state.paises.users);
    //console.log(customs);
    return docs;
}
export const GetDashDocs = () =>{

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDashDocs());
    }, [dispatch])

    let customs = useSelector(state => state.paises.users);
    return customs;
}