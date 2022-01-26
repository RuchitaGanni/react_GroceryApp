import React from 'react';
const BookingTable = (props) => {

    const renderMeal = ({ finalOrder }) => {

        if (finalOrder) {
            console.log(typeof finalOrder.length, 'len')
            if (finalOrder.length >= 1) {
                console.log(finalOrder.length, 'if')
                return finalOrder.map((item) => {
                    // if(item.bank_status)?1:0;
                    return (
                        <tr id="bookingsTr">
                            <td>
                                {item.orderId}
                            </td>
                            <td>
                                {item.date}
                            </td>
                            <td>
                                &#8377;  {item.totalCost}
                            </td>
                            <td >
                                <i class="fas fa-shipping-fast"></i> {item.status}

                            </td>
                            <td>
                                <i class="fa fa-money" aria-hidden="true"></i>
                            </td>
                        </tr>
                    )
                })
            }
            else {

                return (
                    <>

                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>

                    </>
                )
            }
        }
    }

    return (
        <>

            <tbody>
                {renderMeal(props)}
            </tbody>
        </>
    )
}

export default BookingTable;