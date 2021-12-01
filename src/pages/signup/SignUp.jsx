import React, { useState } from 'react';
import '../../pages/login/Login.scss';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { useForm, Controller } from 'react-hook-form';
import UserService from '../../service/UserService';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const userService = new UserService();
function SignUp() {
    //password visibility
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage ] = useState("");
    const [messageColor, setMessageColor] = useState("");

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    const handlePasswordToggle = () => {
        setPasswordVisibility(!passwordVisibility)
    }

    const { handleSubmit, control } = useForm();
    const onSubmit = data => {
        console.log(data);
        userService.registration("/registration", data)
            .then((res) => {
                console.log("User Registered Successfully!!");
                localStorage.setItem("fullName", res.data.result.fullName);
                setAlertMessage("Registered Sucessfully !");
                setMessageColor("success");
                setOpen(true);
            })
            .catch((error) => {
                console.log(error);
                setAlertMessage("User Not Registered !");
                setMessageColor("error");
                setOpen(true);
            })
    }


    return (
        <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="fullName"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            size="small"
                            fullWidth
                            label="Full Name"
                            variant="outlined"
                            style={{ fontSize: "1px" }}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : " "}
                        />
                    )}
                    rules={{ required: 'Enter Full Name' }}
                />

                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            size="small"
                            fullWidth
                            label="Email Id"
                            variant="outlined"
                            style={{ fontSize: "1px" }}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : " "}
                            type="email" />
                    )}
                    rules={{ required: 'Enter valid Email' }}
                />
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    <div>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl size="small" fullWidth variant="outlined">
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        size="small"
                                        type={passwordVisibility ? "text" : "password"}
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : " "}

                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={handlePasswordToggle}
                                                        edge="end"
                                                    >

                                                        {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </FormControl>
                            )}
                            rules={{ required: 'Enter Password' }}
                        />
                    </div>
                </Box>
                <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            size="small"
                            fullWidth
                            label="Mobile Number"
                            variant="outlined"
                            style={{ fontSize: "1px" }}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : " "}
                        />
                    )}
                    rules={{ required: 'Enter valid Mobile Number', pattern: /^[7-9][0-9]{9}$/ }}
                />
                <Button type="submit" fullWidth variant="contained" style={{ marginTop: "7px", textTransform: "none", background: "#A03037 0% 0% no-repeat padding-box", opacity: 1 }}>
                    Sign Up
                </Button>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={messageColor} sx={{ width: "100%" }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </form>
        </div>
    )
}

export default SignUp
