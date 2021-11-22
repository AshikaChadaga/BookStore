import React from 'react';
import '../login/Login.scss';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

const handleMouseDownPassword = (event) => {
    event.preventDefault();
};


function SignUp() {
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
    return (


        <div className="form">

            <TextField fullWidth style={{ paddingBottom: "10%", fontSize: "1px" }} size="small" label="Full Name" variant="outlined" />

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

            <TextField fullWidth style={{ paddingBottom: "10%", fontSize: "1px" }} size="small" label="Mobile Number" variant="outlined" />

            <Button fullWidth variant="contained" style={{ marginTop: "7px", textTransform: "none", background: "#A03037 0% 0% no-repeat padding-box", opacity: 1 }}>
                Sign Up
            </Button>
        </div>

    )
}

export default SignUp
