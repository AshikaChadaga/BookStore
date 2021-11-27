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
import { useNavigate } from 'react-router';

const userService = new UserService();
function SignUp() {
    let navigate = useNavigate();
    //password visibility
    const [passwordVisibility, setPasswordVisibility] = useState(false);
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
        })
        .catch((error) => {
            console.log(error);
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
                            fullWidth style={{  fontSize: "1px" }}
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
                            fullWidth style={{  fontSize: "1px" }}
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
                            style={{  fontSize: "1px" }}
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
            </form>
        </div>
    )
}

export default SignUp
