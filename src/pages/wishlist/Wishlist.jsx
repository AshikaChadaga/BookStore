import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './Wishlist.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, getWishlistItems } from '../../store/actions/cartAction';
import bookImage from "../../assets/dashboard/Image 11.png";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import UserService from '../../service/UserService';
import loader from '../../assets/dashboard/301.gif';

const userService = new UserService();

function Wishlist() {

    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlistItems);
    const [loading, setLoading] = useState(false);

    async function getWishlistBooks() {
        dispatch(getWishlistItems());
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    async function getCartBooks() {
        dispatch(getCartItems());
    }

    const handleRemove = (bookId) => {
        userService.deleteWishlistItem(`/remove_wishlist_item/${bookId}`)
            .then((res) => {
                console.log("Item deleted from Wishlist!");
                getWishlistBooks();
            })
            .catch(error => {
                console.error('Error encountered while Removing from Wishlist!', error);
            });
    }

    const addBookToBag = (bookId) => {
        userService.addToBag(`/add_cart_item/${bookId}`, {})
            .then(() => {
                console.log("Book Added To Cart!");
                handleRemove(bookId);
                getWishlistItems();
                getCartBooks();

            })
            .catch(error => {
                console.error('Error encountered while Adding Book To Cart!', error);
            });
    }

    React.useEffect(() => {
        setLoading(true);
        getCartBooks();
        getWishlistBooks();
    }, [])

    const generateWishlist = () => {
        return (
            <div className="wishlist-items">

                {wishlistItems.wishlistItems.length === 0 ? <div className="empty"><h3>The Wishlist is Empty</h3></div> :
                    wishlistItems.wishlistItems.map((product) => (

                        <div key={product.product_id._id} className="book">
                            <div className="image">
                                <img width="100px" src={bookImage} alt="book" />
                            </div>
                            <div className="details">
                                <p className="book-name">{product.product_id.bookName}</p>
                                <p className="author">by {product.product_id.author}</p>
                                <p className="price">Rs. {product.product_id.price}</p>
                            </div>

                            <div className="buttons">
                                <Button onClick={() => addBookToBag(product.product_id._id)} style={{ backgroundColor: "#A03037", marginRight: "30px" }} variant="contained">
                                    ADD TO BAG
                                </Button>
                                <IconButton onClick={() => handleRemove(product.product_id._id)}>
                                    <DeleteIcon style={{ color: "grey", cursor: "pointer" }}></DeleteIcon>
                                </IconButton>
                            </div>
                        </div>

                    ))
                }

            </div>
        )
    }

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
                <div className="main" id="main">
                    <div className="wishlist-title">
                        <p className="mywishlist">My Wishlist ({wishlistItems.wishlistItems.length})</p>
                    </div>

                    {generateWishlist()}

                </div>
                <Footer />
            </div>


        </div>
    )
}

export default Wishlist
