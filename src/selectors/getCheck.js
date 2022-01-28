import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCheck, getCheckE } from "../actions/checker";


export const GetCheck = () =>{
    console.log("Verificando Checkin");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCheck());
    }, [dispatch])

}
export const GetCheckE = () =>{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCheckE());
    }, [dispatch])

}
