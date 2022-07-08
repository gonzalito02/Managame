import React from "react";

export default function FormActionCreate () {

    var valor = 0

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>
                        Concepto
                    </th>
                    <th>
                        Observación / Detalle
                    </th>
                    <th>
                        Input
                    </th>
                    <th>
                        % de planta / Tasa 
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        Precio A.
                    </td>
                    <td>
                        Indicar el precio de venta en el mercado del producto A.
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>
                <tr>
                    <td>
                        Producción de A.
                    </td>
                    <td>
                        Indicar la cantidad a generar del producto A. Recuerde que es por porcentajes múltiplos de 10.
                    </td>
                    <td>
                        {"stock a producir de A"}
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>
                <tr>
                    <td>
                        Inversión en Calidad de A.
                    </td>
                    <td>
                        Inversión en calidad del producto A. Costo por punto de calidad: $25.000
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>

                <tr>
                    <td>
                        Precio B.
                    </td>
                    <td>
                        Indicar el precio de venta en el mercado del producto B.
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>
                <tr>
                    <td>
                        Producción de B.
                    </td>
                    <td>
                        Indicar la cantidad a generar del producto B. Recuerde que es por porcentajes múltiplos de 10.
                    </td>
                    <td>
                        {"stock a producir de B"}
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>
                <tr>
                    <td>
                        Inversión en Calidad de B.
                    </td>
                    <td>
                        Inversión en calidad del producto B. Costo por punto de calidad: $25.000
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>

                <tr>
                    <td>
                        Precio C.
                    </td>
                    <td>
                        Indicar el precio de venta en el mercado del producto C.
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>
                <tr>
                    <td>
                        Producción de C.
                    </td>
                    <td>
                        Indicar la cantidad a generar del producto C. Recuerde que es por porcentajes múltiplos de 10.
                    </td>
                    <td>
                        {"stock a producir de C"}
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>
                <tr>
                    <td>
                        Inversión en Calidad de C.
                    </td>
                    <td>
                        Inversión en calidad del producto C. Costo por punto de calidad: $25.000
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>

                <tr>
                    <td>
                        Otros movimientos.
                    </td>
                </tr>

                <tr>
                    <td>
                        Inversión Financiera Fija.
                    </td>
                    <td>
                        Inversión a plazo conocido y tasa fija inicial.
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>

                <tr>
                    <td>
                        Inversión Financiera Variable.
                    </td>
                    <td>
                        Inversión dinámica. Una vez creada la posición, se debe cerrar la misma. Tasa máxima de rendimiento: 30%
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>

                <tr>
                    <td>
                        Préstamo.
                    </td>
                    <td>
                        Tasa mínima 20%. Monto máximo: $100.000
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>

                <tr>
                    <td>
                        {null}
                    </td>
                    <td>
                        Total acumulado
                    </td>
                    <td>
                        {valor}
                    </td>
                </tr>

            </tbody>
        </table>
        <button type="submit">Enviar</button>
        </>
    )
}