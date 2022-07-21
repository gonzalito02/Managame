import React from "react";
import { useDispatch } from "react-redux";
import { deleteStudent } from "../../../redux/actions/actions";

export default function DeleteStudent ({data}) {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(deleteStudent(data.id))
    }

    return (
        <button onClick={(e) => handleClick()}>
            Delete
        </button>
    )
}