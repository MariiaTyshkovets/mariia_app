import React from "react";

function Tr(props) {

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.obj.orderName}</td>
            <td>{props.obj.orderPhone}</td>
            <td>{props.obj.orderFast ? 'YES': 'NO'}</td>
            <td>{props.obj.orderPrice}</td>
            <td>{Object.entries(props.obj.orderProducts).map((obj, index, arr) => {
                    if (index !== arr.length - 1) {
                        return `${obj[0]}: ${obj[1]}, `
                    } else {
                        return `${obj[0]}: ${obj[1]}`
                    }
                })}</td>
        </tr>
    )
}

export default Tr;