import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../../store/actions/cartAction';
import bookImage from "../../assets/dashboard/Image 11.png";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button } from '@mui/material';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from '@mui/material/TextField';
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm, Controller } from 'react-hook-form';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import UserService from '../../service/UserService';
import './MyCart.scss'
import { useNavigate } from 'react-router';
import loader from '../../assets/dashboard/301.gif';

const userService = new UserService();

function MyCart() {
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cartItems);
    const [showPlaceOrder, setShowPlaceOrder] = useState(true);
    const [showContinue, setShowContinue] = useState(true);
    const [checked, setChecked] = useState(false);
    const [checkedContinue, setCheckedContinue] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { handleSubmit, control } = useForm();

    const onSubmit = data => {
        console.log(data);

        let payload = {
            "addressType": data.type,
            "fullAddress": data.address,
            "city": data.city,
            "state": data.state
        }
        userService.updateDetails("/edit_user", payload)
            .then((res) => {
                console.log("Customer Details Updated!");
                setCheckedContinue(true);
                setDisabled(true);
                setShowContinue(prev => !prev);
                // getCartBooks();
            })
            .catch(error => {
                console.error('Error encountered while updating customer details!', error);
            });
    }

    // console.log("Cart Items: ", cartItems);

    async function getCartBooks() {
        dispatch(getCartItems());
        setTimeout(() => {
            setLoading(false);
        }, 2000);

    }

    const handleChange = () => {
        setChecked(true);
        setShowPlaceOrder(prev => !prev)
    };



    const handleRemove = (product) => {
        userService.deleteCartItem(`/remove_cart_item/${product._id}`)
            .then((res) => {
                console.log("Item deleted from Cart!");
                getCartBooks();
            })
            .catch(error => {
                console.error('Error encountered while Removing from cart!', error);
            });
    }

    const handleIncrement = (product) => {
        let quantity = product.quantityToBuy + 1;
        let data = {
            "quantityToBuy": quantity
        }
        userService.updateQuantity(`/cart_item_quantity/${product._id}`, data)
            .then((res) => {
                console.log("Quantity Incremented!");
                getCartBooks();
            })
            .catch(error => {
                console.error('Error encountered while Incementing Quantity!', error);
            });
    };

    const handleDecrement = (product) => {
        let quantity = product.quantityToBuy - 1;
        let data = {
            "quantityToBuy": quantity
        }
        userService.updateQuantity(`/cart_item_quantity/${product._id}`, data)
            .then((res) => {
                console.log("Quantity Decremented!");
                getCartBooks();
            })
            .catch(error => {
                console.error('Error encountered while Decementing Quantity!', error);
            });
    };

    const handleCheckout = () => {
        console.log("in checkout");
        let orders = [];
        cartItems.cartItems.map((product) => {
            let data = {
                "product_id": product.product_id._id,
                "product_name": product.product_id.bookName,
                "product_quantity": product.quantityToBuy,
                "product_price": product.product_id.price
            }
            orders.push(data);
            handleRemove(product);
        })
        // console.log("Orders : ", orders);
        let payload = {
            "orders": orders
        }
        userService.placeOrder("/add/order/", payload)
            .then((res) => {
                console.log("Order Placed!");
                navigate("/cart/order-placed");
            })
            .catch(error => {
                console.error('Error encountered while Placing Order!', error);
            });
    }



    const generateCart = () => {

        return (
            <div className="cart-items">
                {cartItems.cartItems.map((product) => (
                    <div key={product.product_id._id} className="book">
                        <div className="image">
                            <img width="100px" src={bookImage} alt="book" />
                        </div>
                        <div className="details">
                            <p className="book-name">{product.product_id.bookName}</p>
                            <p className="author">by {product.product_id.author}</p>
                            <p className="price">Rs. {product.product_id.price}</p>
                            <Stack direction="row" spacing={1}>
                                <button onClick={() => { handleDecrement(product) }} disabled={product.quantityToBuy === 1 ? true : false} className="plus-icon" >-</button>
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
                                >{product.quantityToBuy}</Avatar>
                                <button onClick={() => { handleIncrement(product) }} className="plus-icon" id="plus" >+</button>
                                <Button onClick={() => { handleRemove(product) }} style={{ textTransform: "none", color: "black", marginLeft: "30px" }} variant="text">Remove</Button>

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
                <Controller
                    name="fullName"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" style={{ marginBottom: "1vw", marginRight: "1.5vw" }}
                            value={value}
                            disabled={disabled}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : " "} />
                    )}
                    rules={{ required: 'Enter Full name' }}
                />
                <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField fullWidth id="outlined-basic" label="Phone number" variant="outlined" style={{ marginBottom: "1vw" }}
                            value={value}
                            disabled={disabled}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : " "} />
                    )}
                    rules={{ required: 'Enter Phone Number' }}
                />
                <Controller
                    name="pinCode"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField fullWidth id="outlined-basic" label="Pincode" variant="outlined" style={{ marginBottom: "1vw", marginRight: "1.5vw" }}
                            value={value}
                            disabled={disabled}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : " "} />
                    )}
                    rules={{ required: 'Enter Pincode' }}
                />
                <Controller
                    name="locality"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField fullWidth id="outlined-basic" label="Locality" variant="outlined" style={{ marginBottom: "1vw" }}
                            value={value}
                            disabled={disabled}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : " "} />
                    )}
                    rules={{ required: 'Enter Locality' }}
                />
                <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Address"
                            multiline
                            rows={3}
                            disabled={disabled}
                            style={{ marginBottom: "1vw", gridColumn: "span 2" }}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : " "} />
                    )}
                    rules={{ required: 'Enter Address' }}
                />
                <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField fullWidth id="outlined-basic" label="City/Town" variant="outlined" style={{ marginBottom: "1vw", marginRight: "1.5vw" }}
                            value={value}
                            disabled={disabled}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : " "} />
                    )}
                    rules={{ required: 'Enter City/Town' }}
                />
                <Controller
                    name="state"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField fullWidth id="outlined-basic" label="State" variant="outlined"
                            value={value}
                            onChange={onChange}
                            disabled={disabled}
                            error={!!error}
                            helperText={error ? error.message : " "} />
                    )}
                    rules={{ required: 'Enter State' }}
                />
            </div>
            <div>
                <h4>Type</h4>
                <Controller
                    name="type"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <RadioGroup
                            fontSize="small"
                            onChange={onChange}
                            value={value}
                            error={!!error}
                            helpertext={error ? error.message : " "}
                            row aria-label="type"
                            style={{ color: "grey" }}>
                            <FormControlLabel
                                value="Home"
                                disabled={disabled}
                                control={<Radio />}
                                label="Home"
                            />
                            <FormControlLabel
                                value="Office"
                                disabled={disabled}
                                control={<Radio />}
                                label="Work" />
                            <FormControlLabel
                                value="Other"
                                disabled={disabled}
                                control={<Radio />}
                                label="Other" />
                        </RadioGroup>
                    )}
                    rules={{ required: "Choose Type" }}
                />
            </div>
        </div>
    );

    const thirdSection = (
        <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="cart-items">
                {cartItems.cartItems.map((product) => (
                    <div key={product.product_id._id} className="book">
                        <div className="image">
                            <img width="100px" src={bookImage} alt="book" />
                        </div>
                        <div className="details">
                            <p className="book-name">{product.product_id.bookName}</p>
                            <p className="author">by {product.product_id.author}</p>
                            <p className="price">Rs. {product.product_id.price * product.quantityToBuy}</p>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    );

    React.useEffect(() => {
        getCartBooks();
        setLoading(true);
    }, [])



    return (
        <div>
            {
                loading &&
                <div className="preloader" id="preloader">
                    <img src={loader} alt="Loading ..." />
                </div >
            }
            <div>


                <Header />
                <div className="myCart">
                    <div className="first-section">
                        <div >
                            <h3 className="title">My Cart ({cartItems.cartItems.length})</h3>
                        </div>

                        {generateCart()}
                        {showPlaceOrder && <div className="place-order" >
                            <Button variant="contained" checked={checked} disabled={cartItems.cartItems.length === 0 ? true : false}
                                onClick={handleChange} style={{ marginTop: "20px" }}>place order</Button>
                        </div>}
                    </div>

                    <div className="second-section">
                        <Collapse in={checked} collapsedSize={40}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {secondSection}
                                {showContinue && <div className="continue" >
                                    <Button type="submit" variant="contained" checked={checkedContinue} style={{ marginTop: "20px" }} >Continue</Button>
                                </div>}
                            </form>
                        </Collapse>
                    </div>

                    <div className="third-section">
                        <Collapse in={checkedContinue} collapsedSize={40}>
                            {thirdSection}
                            <div className="checkout" >
                                <Button onClick={() => { handleCheckout() }} variant="contained" style={{marginTop:"20px"}}>Checkout</Button>
                            </div>
                        </Collapse>

                    </div>

                </div>

                <Footer />
            </div>
        </div>
    )
}

export default MyCart
