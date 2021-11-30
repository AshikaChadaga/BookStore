import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import book from '../../assets/header/education.png';
import Badge from '@mui/material/Badge';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import './Header.scss'


const theme = createTheme({
  palette: {
    myColor: {
      main: "#fff",
      contrastText: "black"
    }
  }
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  minWidth: "35%",
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(2),
    // width: "auto"
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: theme.spacing(2),
    // width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "80ch"
    }
  }
}));

export function Header(props) {

  let navigate = useNavigate();
  const cartItems = useSelector(state => state.cartItems);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ backgroundColor: "#A03037", overflowX: "hidden" }}>
          <Toolbar>
            <img onClick={() => navigate("/dashboard")} style={{ marginLeft: "10%", marginRight: "3px", cursor: "pointer" }} src={book} alt="book" />
            <Typography
              onClick={() => navigate("/dashboard")}
              className="bookstore"
              variant="h6"
              component="div"
              nowrap="false"
              sx={{ display: { xs: 'none', sm: "block", font: "normal normal normal 20px/26px Roboto" }, cursor: "pointer" }}
            >
              Bookstore
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon style={{ color: "#9D9D9D" }} />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => props.setSearchWord(e.target.value)}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ marginRight: "1%" }} >
              <IconButton onClick={handleClick}>
                <PersonOutlineOutlinedIcon style={{ color: "#fff" }} />
              </IconButton>
              <Typography style={{cursor:"pointer"}} onClick={handleClick}>
                {localStorage.getItem("fullName")}
              </Typography>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
              >
                <div className="pop-items">
                  <p className="title">Hello, {localStorage.getItem("fullName")}</p>
                  <p className="wishlist">
                    <FavoriteBorderOutlinedIcon onClick={() => navigate("/dashboard/wishlist")} style={{color:"#878787", width:"20"}} size="small" />
                    <span onClick={() => navigate("/dashboard/wishlist")} className="text">My Wishlist</span>
                  </p>
                  <Button style={{marginBottom:"10px", color:"#A03037", borderColor:"#A03037"}} variant="outlined">Logout</Button>
                </div>
              </Popover>
            </Box>

            <Box sx={{ marginRight: "15%" }}>
              <IconButton onClick={() => navigate('/cart', { replace: true })}>
                <ThemeProvider theme={theme}>
                  <Badge badgeContent={cartItems.cartItems.length} color="myColor">
                    <ShoppingCartOutlinedIcon style={{ color: "#fff" }} />
                  </Badge>
                </ThemeProvider>
              </IconButton>
              <Typography>
                Cart
              </Typography>
            </Box>

          </Toolbar>
        </AppBar>
      </Box >
    </div>
  );
}

export default Header
