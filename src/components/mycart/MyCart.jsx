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
import './MyCart.scss'

function MyCart() {
    const cartItems = useSelector(state => state.cartItems);
    const [displayPlaceOrder, setDisplayPlaceOrder] = useState("normal");
    const [displayContinue, setDisplayContinue] = useState("normal");
    const [showPlaceOrder, setShowPlaceOrder] = useState(true);
    const [showContinue, setShowContinue] = useState(true);
    const [checked, setChecked] = useState(false);
    const [checkedContinue, setCheckedContinue] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    const { handleSubmit, control } = useForm();

    const onSubmit = data => {
        console.log(data);
        setCheckedContinue(true);
        setDisabled(true);
        setShowContinue(prev => !prev);
    }

    console.log("Cart Items: ", cartItems);

    async function getCartBooks() {
        dispatch(getCartItems());
    }

    const handleChange = () => {
        setChecked(true);
        setShowPlaceOrder(prev => !prev)
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

                                <button disabled={disabled} className="plus-icon" >-</button>
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
                                <button disabled={disabled} className="plus-icon" id="plus" >+</button>

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
                <Controller
                    name="fullName"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField id="outlined-basic" label="Name" variant="outlined" style={{ marginBottom: "1vw", marginRight: "1.5vw" }}
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
                        <TextField id="outlined-basic" label="Phone number" variant="outlined" style={{ marginBottom: "1vw" }}
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
                        <TextField id="outlined-basic" label="Pincode" variant="outlined" style={{ marginBottom: "1vw", marginRight: "1.5vw" }}
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
                        <TextField id="outlined-basic" label="Locality" variant="outlined" style={{ marginBottom: "1vw" }}
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
                            style={{ marginBottom: "1vw" }}
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
                        <TextField id="outlined-basic" label="City/Town" variant="outlined" style={{ marginBottom: "1vw", marginRight: "1.5vw" }}
                            value={value}
                            disabled={disabled}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : " "} />
                    )}
                    rules={{ required: 'Enter City/Town' }}
                />
                <Controller
                    name="landmark"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField id="outlined-basic" label="Landmark" variant="outlined"
                            value={value}
                            onChange={onChange}
                            disabled={disabled}
                            error={!!error}
                            helperText={error ? error.message : " "} />
                    )}
                    rules={{ required: 'Enter Landmark' }}
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
                                value="home"
                                disabled={disabled}
                                control={<Radio />}
                                label="Home"
                            />
                            <FormControlLabel
                                value="work"
                                disabled={disabled}
                                control={<Radio />}
                                label="Work" />
                            <FormControlLabel
                                value="other"
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
                {showPlaceOrder && <div className="place-order" style={{ display: { displayPlaceOrder } }}>
                    <Button variant="contained" checked={checked}
                        onClick={handleChange}>place order</Button>
                </div>}
            </div>

            <div className="second-section">
                <Collapse in={checked} collapsedSize={40}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {secondSection}
                        {showContinue && <div className="continue" >
                            <Button type="submit" variant="contained" style={{ display: { displayContinue } }} checked={checkedContinue}
                            >Continue</Button>
                        </div>}
                    </form>
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
