import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './Wishlist.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, getWishlistItems } from '../../store/actions/cartAction';
import bookImage from "../../assets/dashboard/Image 11.png";
import '../../components/mycart/MyCart.scss'

function Wishlist() {

    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlistItems);
    // console.log(wishlistItems);

    async function getWishlistBooks() {
        dispatch(getWishlistItems());
    }

    React.useEffect(() => {
        getWishlistBooks();
    }, [])

    const generateWishlist = () => {
        return (
            <div className="cart-items">
                {wishlistItems.wishlistItems.map((product) => (
                    <div key={product.product_id._id} className="book">
                        <div className="image">
                            <img width="100px" src={bookImage} alt="book" />
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


        )
    }

    return (
        <div>
            <Header />
            <div className="mainContent">
                <div className="title">
                    <p className="mywishlist">My Wishlist ({wishlistItems.wishlistItems.length})</p>
                </div>

                {generateWishlist()}

            </div>
            <Footer />
        </div>
    )
}

export default Wishlist
