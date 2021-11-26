import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, getWishlistItems } from '../../store/actions/cartAction';
import bookImage from "../../assets/dashboard/Image 11.png";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button } from '@mui/material';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from '@mui/material/TextField';
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import './MyCart.scss'

function MyCart() {
    const cartItems = useSelector(state => state.cartItems);
    const [displayPlaceOrder, setDisplayPlaceOrder] = useState("normal");
    const [displayContinue, setDisplayContinue] = useState("normal");
    const [checked, setChecked] = React.useState(false);
    const [checkedContinue, setCheckedContinue] = React.useState(false);
    const dispatch = useDispatch();

    console.log("Cart Items: ", cartItems);

    async function getCartBooks() {
        dispatch(getCartItems("cart"));
    }


    const handleChange = () => {
        setChecked(true);
        setDisplayPlaceOrder("none");
    };
    const handleChangeContinue = () => {
        setCheckedContinue(true);
        setDisplayContinue("none");
    };

    const generateCart = () => {

        return (
            <div className="cart-items">
                {cartItems.cartItems.map((product) => (
                    <div className="book">
                        <div className="image">
                            <img width="100%" src={bookImage} alt="book Image" />
                        </div>
                        <div className="details">
                            <p className="book-name">{product.product_id.bookName}</p>
                            <p className="author">by {product.product_id.author}</p>
                            <p className="price">Rs. {product.product_id.price}</p>
                            <Stack direction="row" spacing={1}>
                                <Avatar
                                    alt="Remy Sharp"
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        color: "black",
                                        background: "#FAFAFA 0% 0% no-repeat padding-box",
                                        border: "1px solid #DBDBDB"
                                    }}
                                >+</Avatar>

                                <Avatar
                                    sx={{
                                        width: 50,
                                        height: 28,
                                        color: "black",
                                        fontSize: "15px",
                                        background: "#FAFAFA 0% 0% no-repeat padding-box",
                                        border: "1px solid #DBDBDB"
                                    }}
                                    variant="square"
                                >1</Avatar>

                                <Avatar
                                    alt="Remy Sharp"
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        color: "black",
                                        fontSize: "30px",
                                        background: "#FAFAFA 0% 0% no-repeat padding-box",
                                        border: "1px solid #DBDBDB"
                                    }}
                                >-</Avatar>

                                <Button style={{ textTransform: "none", color: "black", marginLeft: "30px" }} variant="text">Remove</Button>

                            </Stack>
                        </div>
                    </div>
                ))
                }
            </div>
        )
    }

    const secondSection = (
        <div className="customer-details">
            <h3>Customer Details</h3>
            <div className="textfield">
                <TextField id="outlined-basic" label="Name" variant="outlined" style={{ marginBottom: "1vw", marginRight: "1.5vw" }} />
                <TextField id="outlined-basic" label="Phone number" variant="outlined" style={{ marginBottom: "1vw" }} />
                <TextField id="outlined-basic" label="Pincode" variant="outlined" style={{ marginBottom: "1vw", marginRight: "1.5vw" }} />
                <TextField id="outlined-basic" label="Locality" variant="outlined" style={{ marginBottom: "1vw" }} />
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Address"
                    multiline
                    rows={3}
                    style={{ marginBottom: "1vw" }}
                />
                <TextField id="outlined-basic" label="City/Town" variant="outlined" style={{ marginBottom: "1vw", marginRight: "1.5vw" }} />
                <TextField id="outlined-basic" label="Landmark" variant="outlined" />
            </div>
            <div>
                <h4>Type</h4>
                <RadioGroup row aria-label="type" name="row-radio-buttons-group" style={{ color: "grey" }}>
                    <FormControlLabel value="home" control={<Radio />} label="Home" />
                    <FormControlLabel value="work" control={<Radio />} label="Work" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </div>

        </div>
    );

    const thirdSection = (
        <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="cart-items">
                {cartItems.cartItems.map((product) => (
                    <div className="book">
                        <div className="image">
                            <img width="100%" src={bookImage} alt="book Image" />
                        </div>
                        <div className="details">
                            <p className="book-name">{product.product_id.bookName}</p>
                            <p className="author">by {product.product_id.author}</p>
                            <p className="price">Rs. {product.product_id.price}</p>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    );

    React.useEffect(() => {
        getCartBooks();
    }, [])



    return (
        <div className="myCart">
            <div className="first-section">
                <div >
                    <h3 className="title">My Cart ({cartItems.cartItems.length})</h3>
                </div>

                {generateCart()}
                <div className="place-order" style={{ display: { displayPlaceOrder } }}>
                    <Button variant="contained" checked={checked}
                        onClick={handleChange}>place order</Button>
                </div>
            </div>

            <div className="second-section">
                <Collapse in={checked} collapsedSize={40}>
                    {secondSection}
                    <div className="continue" >
                        <Button variant="contained" style={{ display: { displayContinue } }} checked={checkedContinue}
                            onClick={handleChangeContinue}>Continue</Button>
                    </div>
                </Collapse>
            </div>

            <div className="third-section">
                <Collapse in={checkedContinue} collapsedSize={40}>
                    {thirdSection}
                    <div className="checkout" >
                        <Button variant="contained" >Checkout</Button>
                    </div>
                </Collapse>

            </div>

        </div>
    )
}

export default MyCart
