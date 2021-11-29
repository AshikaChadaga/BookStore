import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from '@mui/material/Box';
import Pagination from "@mui/material/Pagination";
import { createTheme, IconButton, PaginationItem } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useDispatch, useSelector } from 'react-redux';
import UserService from '../../service/UserService';
import './Dashboard.scss';
import { getCartItems, getWishlistItems } from '../../store/actions/cartAction';
import DisplayBooks from '../../components/displaybooks/DisplayBooks';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import StarIcon from "@mui/icons-material/Star";
import { green } from "@mui/material/colors";
import bookImage from "../../assets/dashboard/Image 11.png";
import Button from "@mui/material/Button";
import { display } from '@mui/system';


const userService = new UserService();

const theme = createTheme({
  palette: {
    myColor: {
      main: "#A03037",
      contrastText: "#ffffff"
    }
  }
});

const left = () => {
  return (<IconButton sx={{ border: '2px solid #E2E2E2' }}><ChevronLeftRoundedIcon /></IconButton>)
}

const right = () => {
  return (<IconButton sx={{ border: '2px solid #E2E2E2' }}><ChevronRightRoundedIcon /></IconButton>)
}


function Dashboard() {

  const [selection, setSelection] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [booksPerPage, setBooksPerPage] = useState(8);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartItems);
  const wishlistItems = useSelector(state => state.wishlistItems);
  const [searchWord, setSearchWord] = useState("");

  // console.log("Cart Items ", cartItems);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleChange = (event) => {
    setSelection(event.target.value);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  async function getCartBooks() {
    dispatch(getCartItems());
  }

  const addBookToBag = (book) => {
    userService.addToBag(`/add_cart_item/${book._id}`, {})
      .then(() => {
        console.log("Book Added To Cart!");
        getCartBooks();
        displayBook();
      })
      .catch(error => {
        console.error('Error encountered while Adding Book To Wishlist!', error);
      });
  }

  async function getWishListBooks() {
    dispatch(getWishlistItems());
  }

  const addBookToWishlist = (book) => {
    console.log(book);
    userService.addToWishlist(`/add_wish_list/${book._id}`, "")
      .then(() => {
        console.log("Book Added To Wishlist!");
        getWishListBooks();
        console.log("Wishlist: ", wishlistItems);
        displayBook();
      })
      .catch(error => {
        console.error('Error encountered while Adding Book To Wishlist!', error);
      });
  }

  const displayBook = () => {
    userService.getBooks("/get/book")
      .then((res) => {
        // console.log(res.data.result);
        setBooks(res.data.result);
        console.log("Books Displayed!");
      })
      .catch(error => {
        console.error('Error encountered while Displaying Books!', error);
      });
  }

  const generateButtons = (book) => {
    let bookIdList = [];
    cartItems.cartItems.map((product) => {
      bookIdList.push(product.product_id._id);
    })

    if (bookIdList.includes(book._id)) {
      return (
        <div style={{ marginLeft: "30px", marginRight: "30px" }}>
          <Button fullWidth style={{ backgroundColor: "#3371B5", marginBottom: "30px" }} variant="contained">
            ADDED TO BAG
          </Button>
        </div>
      )
    }

    else if (wishlistItems.wishlistItems.includes(book._id)) {
      return (
        <div style={{ marginLeft: "30px", marginRight: "30px" }}>
          <Button
            fullWidth
            variant="outlined"
            style={{ color: "black", borderColor: "#878787", marginRight: "30px", marginBottom: "30px" }}
          >
            ADDED TO WISHLIST
          </Button>
        </div>
      )
    }

    else {
      return (<div className="button">
        <Button onClick={() => { addBookToBag(book) }} style={{ backgroundColor: "#A03037", marginLeft: "30px" }} variant="contained">
          ADD TO BAG
        </Button>
        <Button
          onClick={() => { addBookToWishlist(book) }}
          variant="outlined"
          style={{ color: "black", borderColor: "#878787", marginRight: "30px" }}
        >
          WISHLIST
        </Button>
      </div>)
    }
  }

  const sortLowToHigh = () => {
    books.sort((a, b) => {
      return a.price - b.price;
    });
    console.log(books);
  }

  const sortHighToLow = () => {
    books.sort((a, b) => {
      return b.price - a.price;
    });
    console.log(books);
  }

  const sortAtoZ = () => {
    books.sort((a, b) => {
      let aBookName = a.bookName.toLowerCase();
      let bBookName = b.bookName.toLowerCase();
      return (aBookName < bBookName) ? -1 : (aBookName > bBookName) ? 1 : 0;

    });
  }

  const sortZtoA = () => {
    books.sort((a, b) => {
      let aBookName = a.bookName.toLowerCase();
      let bBookName = b.bookName.toLowerCase();
      return (aBookName > bBookName) ? -1 : (aBookName < bBookName) ? 1 : 0;

    });
  }

  const displayBooks = (currentBooks) => {
    return (
      <div className="display-cards">
        {
          currentBooks.map((book) => (
            <div className="display-books">
              <Card
                id={book._id}
                sx={{ maxWidth: 320, maxHeight: 500, background: "#FFFFFF 0% 0% no-repeat padding-box", border: "1px solid #E2E2E2", borderRadius: "3px", opacity: "1" }}>
                <CardContent style={{ backgroundColor: "#F5F5F5" }}>
                  <img width="40%" src={bookImage} alt="book Image" />
                </CardContent>
                <CardContent >
                  <Typography style={{ paddingLeft: "0.7vw", fontWeight: "bold" }} variant="body2" color="black" textAlign="left">
                    {book.bookName}
                  </Typography>
                  <Typography style={{ paddingLeft: "0.7vw", paddingBottom: "1vh" }} variant="body2" color="text.secondary" textAlign="left">
                    by {book.author}
                  </Typography>
                  <Typography style={{ paddingLeft: "0.7vw", fontWeight: "bold", paddingBottom: "1vh" }} variant="body2" color="black" textAlign="left">
                    Rs. {book.price}
                  </Typography>
                  <Typography style={{ paddingLeft: "0.7vw", display: "grid", gridTemplateColumns: "1fr 50fr", textAlign: "left" }} variant="body2" color="black">
                    <Avatar
                      sx={{
                        textAlign: "left",
                        bgcolor: green[700],
                        width: 60,
                        height: 30,
                        font: "normal normal bold 18px/13px Roboto"
                      }}
                      variant="rounded"
                    >
                      4.5
                      <StarIcon sx={{ m: 0.4, width: 18 }} />
                    </Avatar>
                    <span style={{ paddingLeft: "10px", paddingTop: "5px" }}>({book.quantity})</span>

                  </Typography>
                </CardContent>
                <div >
                  {generateButtons(book)}

                </div>
              </Card>
            </div>
          ))
        }
      </div>
    )
  }

  useEffect(() => {
    getCartBooks();
    getWishListBooks();
  }, [])

  useEffect(() => {
    displayBook();
  }, [cartItems, wishlistItems]);

  useEffect(() => {
  }, [books]);

  return (
    <div>
      <Header setSearchWord={setSearchWord} />
      <div className="main-content">
        <div className="title">
          <div className="left-content">
            <span className="book">Books</span>
            <span className="items">({books.length} items)</span>
          </div>
          <div className="sort-options">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={selection}
                onChange={handleChange}
                displayEmpty
                size="small"
              >
                <MenuItem style={{ display: "none" }} disabled value="">
                  Sort by relevance
                </MenuItem>
                <MenuItem onClick={sortLowToHigh} style={{ fontSize: "15px" }} value={1}>Price: Low to High</MenuItem>
                <MenuItem onClick={sortHighToLow} style={{ fontSize: "15px" }} value={2}>Price: High to Low</MenuItem>
                <MenuItem onClick={sortAtoZ} style={{ fontSize: "15px" }} value={3}>Sort: A - Z</MenuItem>
                <MenuItem onClick={sortZtoA} style={{ fontSize: "15px" }} value={4}>Sort: Z - A</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div>
          {searchWord.length == 0 ? displayBooks(currentBooks) : displayBooks(currentBooks.filter(book => (book.bookName.toLowerCase().includes(searchWord) || book.author.toLowerCase().includes(searchWord))))}
        </div>
      </div>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: "center", margin: "25px" }} >
          <Pagination
            onChange={handlePageChange}
            count={Math.ceil(books.length / booksPerPage)}
            color="myColor"
            page={currentPage}
            shape="rounded"
            renderItem={(item) => (
              <PaginationItem
                components={{ previous: left, next: right }}
                {...item}
              />
            )}
          />
        </Box>
      </ThemeProvider>
      <Footer />
    </div>
  )
}

export default Dashboard
