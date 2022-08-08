import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import { deleteStudent, setToNullBusiness } from "../../../redux/actions/actions";

export default function DeleteStudent ({data}) {

    const dispatch = useDispatch()

    const ids = {
        id : data.id
    }

    const handleClick = () => {
        dispatch(deleteStudent(data.id))
    }
    const handleSecondClick = () => {
        dispatch(setToNullBusiness(ids))
    }

    return (
        <>
            <Button onClick={(e) => handleClick()}>
                Delete
            </Button>
            <span>{" "}</span>
            <Button onClick={(e) => handleSecondClick()}>
                Set to null business field
            </Button>
        </>
    )
}