import React from 'react';
import CommonLogin from '../../components/commonlogin/CommonLogin';
import Login from '../login/Login';
import SignUp from '../signup/SignUp';
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import './Homepage.scss';

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 25,
    border: "1px, solid #A03037",
    width: "100%",
    backgroundColor: "#A03037"
  }
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "uppercase",
    fontWeight: "bolder",
    fontSize: theme.typography.pxToRem(17),
    color: "#878787",
    "&.Mui-selected": {
      color: "#0A0102"
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)"
    }
  })
);


function Homepage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="homepage">
      <CommonLogin />
      <div className="layer2">
        <div className="login">
          <div className="title">
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              borderRadius: "6px"
            }}>
              <Box sx={{ bgcolor: "#fff", color: "black", borderRadius: "6px" }}>
                <StyledTabs
                  sx={{ color: "black" }}
                  value={value}
                  onChange={handleChange}
                >
                  <StyledTab sx={{ marginRight: "4vw" }} label="Login" />
                  <StyledTab label="SignUp" />
                </StyledTabs>
                <Box sx={{ p: 2 }} />
                {value == 0 ?
                  (window.history.pushState('', 'login', '/login'),
                    <div><Login /></div>)
                  :
                  (window.history.pushState('', 'signup', '/signup'),
                    < div >
                      <SignUp />
                    </div>)
                }
              </Box>
            </Box>
          </div>
        </div>


      </div>
    </div >
  )
}


export default Homepage