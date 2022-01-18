import React from 'react';
const BookingTable = (props) => {

    const renderMeal = ({ finalOrder }) => {
        console.log('finalOrder', finalOrder.length)
        if (finalOrder) {

            if (finalOrder.length > 0) {
                console.log('finalOrder2', finalOrder.length)

                return finalOrder.map((item) => {
                    // if(item.bank_status)?1:0;
                    return (
                        <tr id="bookingsTr">
                            <td>

                            </td>
                            <td>
                                {item.date}
                            </td>
                            <td>
                                &#8377;  {item.totalCost}
                            </td>
                            <td style={{ color: "green" }}>
                                <i class="fab fa-cc-visa fa-2x"></i>
                                {item.bank_status}
                                <br />
                                <i class="fas fa-shipping-fast"></i> Out for delivery

                            </td>
                            <td>
                                <i class="fa fa-money" aria-hidden="true"></i>
                            </td>
                        </tr>
                    )
                })
            }
        } else {
            return (
                <>
                    <td>

                    </td>

                    <td>

                    </td>
                    <td>
                        <img src="/images/loader4.gif" alt="loader" className="LoaderGIF2" />
                    </td>

                </>
            )
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