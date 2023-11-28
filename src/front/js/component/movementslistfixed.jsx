import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { format } from "date-fns";

export const MovementsListFixed = () => {

    const { store, actions } = useContext(Context);
    const [fixes, setFixes] = useState([]);
    useEffect(() => {
        async function transformData() {
            await actions.getFixes();
            const data = store.fixes.map((fixed) => ({ ...fixed, dateTime: format(new Date(fixed.dateTime), 'dd/MM/yyyy' )}))
            setFixes(data);
        }
        transformData();
    }, [])

    return (
        <>
            <div id="resumen" className="container p-4 mb-5">
                <div className="row">
                    <h2 className="text-center pt-3">Resumen</h2>
                    <p className="text-center pb-5">Listado de todos las operaciones realizadas en orden cronológico</p>
                </div>
                <div className="wrap flex-column px-5 mx-5">
                    <div className="table row justify-content-center align-items-center">
                        <table className="table text-center p-4">
                            <thead>
                                <tr id="table-title">
                                    <th className="col text-white text-center">Fecha</th>
                                    <th className="col text-white text-center">Categoria</th>
                                    <th className="col text-white text-center">Importe</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fixes.map(({value, fixedcategory, dateTime}, index) => (  
                                    <tr key={index}>
                                        <td scope="col">{dateTime}</td>
                                        <td scope="col">{fixedcategory.name}</td>
                                        <td scope="col">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Link to="/expenses"> {/*Atención a esta función y/o botón*/}
                    <button
                        id="button-confirm"
                        className="btn btn-lg w-100 text-white fs-4 mt-5"
                    >
                        Descargar en pdf
                    </button>
                </Link>
            </div>
        </>
    )
}