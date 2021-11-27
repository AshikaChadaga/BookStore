import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
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
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';


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
  // marginLeft: theme.spacing(30),
  minWidth: "37%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
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
  color: "#9D9D9D",
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

export function Header() {
  let navigate = useNavigate();
  const cartItems = useSelector(state => state.cartItems);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#A03037" }}>
        <Toolbar>
          <img onClick={()=>navigate("/dashboard")} style={{ marginLeft: "10%", marginRight: "3px", cursor:"pointer" }} src={book} alt="book image" />
          <Typography
            onClick={()=>navigate("/dashboard")}
            className="bookstore"
            variant="h6"
            component="div"
            nowrap="true"
            sx={{ display: { sm: "block", font: "normal normal normal 20px/26px Roboto" }, cursor:"pointer" }}
          >
            Bookstore
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon style={{ color: "#9D9D9D" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Typography style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "20%" }}>
            <IconButton >
              <AccountCircleOutlinedIcon style={{ color: "#fff" }} />
            </IconButton>
            {localStorage.getItem("fullName")}
          </Typography>
          <Typography style={{ display: "flex", flexDirection: "column", justifyContent: "center", font: "normal normal normal 15px/13px Roboto", marginLeft: "1%" }}>
            <IconButton onClick={() => navigate('/cart', { replace: true })}>
              <ThemeProvider theme={theme}>
                <Badge badgeContent={cartItems.cartItems.length} color="myColor">
                  <ShoppingCartOutlinedIcon style={{ color: "#fff" }} />
                </Badge>
              </ThemeProvider>
            </IconButton>
            Cart
          </Typography>
        </Toolbar>
      </AppBar>
    </Box >
  );
}

export default Header
