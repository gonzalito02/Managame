import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getResultsPlayerById } from "../../../redux/actions/actions";
import NavBar from "../../NavBar";
import StudentResultsTable from "./StudentResultsTable";

export default function StudentResults () {

    return (
        <>
            <NavBar/>
        <h3>
            Registro de compras
        </h3>
            <StudentResultsTable/>
        </>
    )

}