import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import './Login.scss'


const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

function Login() {

    //password visibility
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false
    });

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };



    const Root = styled("div")(({ theme }) => ({
        width: "100%",
        ...theme.typography.body2,
        "& > :not(style) + :not(style)": {
            paddingTop: 100
        }
    }));

    return (

        <div className="form">

            <TextField fullWidth style={{ paddingBottom: "10%", fontSize: "1px" }} size="small" label="Email Id" variant="outlined" />

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <div>
                    <FormControl size="small" fullWidth variant="outlined">
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput
                            fullWidth
                            label="Password"
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handlePasswordChange("password")}
                            style={{ marginBottom: "10%" }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
            </Box>

            <Button fullWidth variant="contained" style={{ textTransform: "none", background: "#A03037 0% 0% no-repeat padding-box", opacity: 1 }}>
                Login
            </Button>

            <Root>
                <Divider style={{ marginTop: "1.5vw", marginBottom: "1.5vw" }}>OR</Divider>
            </Root>

            <div className="last-button">
                <Button fullWidth variant="contained" style={{ textTransform: "none", background: "#4266B2 0% 0 % no - repeat padding- box", opacity: 1 }}>
                    FaceBook
                </Button>
                <Button fullWidth variant="contained" style={{ marginTop: "6px", color: "black", textTransform: "none", border: "1px solid #E4E4E4", background: "#F5F5F5 0% 0% no-repeat padding-box", opacity: 1 }}>
                    Google
                </Button>
            </div>

        </div >
    )
}

export default Login
