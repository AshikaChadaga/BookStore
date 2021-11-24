import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import { useForm, Controller } from 'react-hook-form';
import './Login.scss'
import UserService from '../../service/UserService';
import { useNavigate } from 'react-router';

const userService = new UserService();

function Login() {

    let navigate = useNavigate();
    //password visibility
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const handlePasswordToggle = () => {
        setPasswordVisibility(!passwordVisibility)
    }

    const Root = styled("div")(({ theme }) => ({
        width: "100%",
        ...theme.typography.body2,
        "& > :not(style) + :not(style)": {
            paddingTop: 100
        }
    }));

    const { handleSubmit, control } = useForm();
    const onSubmit = data => {
        console.log(data);
        userService.login("/login", data)
            .then((response) => {
                console.log("User Logged in Successfully!!");
                localStorage.setItem("id", response.data.result.accessToken);
                console.log("Access Token: ", localStorage.getItem("id"));
                navigate("/dashboard");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (

        <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField size="small" fullWidth id="outlined-basic" label="Email Id" variant="outlined"
                            fullWidth style={{ fontSize: "1px" }} size="small" label="Email Id" variant="outlined"
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

                <Button type="submit" fullWidth variant="contained" style={{ textTransform: "none", background: "#A03037 0% 0% no-repeat padding-box", opacity: 1 }}>
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

            </form>


        </div >
    )
}

export default Login
