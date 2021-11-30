import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import orderImage from '../../assets/order/orderplaced.jpeg';
import { Button } from '@mui/material';
import './OrderPlaced.scss';
import { Navigate, useNavigate } from 'react-router';


function OrderPlaced() {
    const navigate = useNavigate();
    return (
        <div>
            <Header />
            <div className="mainContent">
                <div>
                    <img className="image" src={orderImage} alt="Order-placed" />
                </div>
                <div >
                    <p className="message">Hurray!!! Your order is confirmed! The order id is ( #123456 ). Save the order id for further communication.</p>
                </div>
                <div className="table">
                    <table className="order-table">
                        <tr>
                            <th className="email">Email Us</th>
                            <th>Contact Us</th>
                            <th>Address</th>
                        </tr>
                        <tr>
                            <td className="email">admin@bookstore.com</td>
                            <td>+91 8163475881</td>
                            <td>
                                42, 14 main 15th Cross, Sector 4, opp to BDA complex near Kamarakom
                                restaurent HSR layout Banglore 560034
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="button">
                <Button onClick={() => { navigate('/dashboard') }} style={{marginTop:"50px", padding:"10px 60px"}} variant="contained">Continue Shopping</Button>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrderPlaced
