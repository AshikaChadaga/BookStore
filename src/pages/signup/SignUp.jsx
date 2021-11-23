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

// const handleMouseDownPassword = (event) => {
//     event.preventDefault();
// };

function SignUp() {
    //password visibility
    // const [values, setValues] = useState({
    //     password: "",
    //     showPassword: false
    // });

    // const handlePasswordChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    //     setPassword(event.target.value);
    // };

    // const handleClickShowPassword = () => {
    //     setValues({
    //         ...values,
    //         showPassword: !values.showPassword
    //     });
    // };

    // const [fullName, setFullName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [mobile, setMobile] = useState("");
    // const [fullNameError, setFullNameError] = useState(false);
    // const [emailError, setEmailError] = useState(false);
    // const [passwordError, setPasswordError] = useState(false);
    // const [mobileError, setMobileError] = useState(false);
    // const [isError, setIsError] = useState(false);

    // const isValidated = () => {
    //     fullName != "" ? setFullNameError(false) : setFullNameError(true);
    //     (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) ? setEmailError(false) : setEmailError(true);
    //     password !== "" ? setPasswordError(false) : setPasswordError(true);
    //     (/^[^[0-9]{10}$/.test(mobile)) ? setMobileError(false) : setMobileError(true);
    //     setIsError(fullNameError || emailError || passwordError || mobileError);
    // };

    // const validate = () => {
    //     isValidated();
    //     if (isError) {
    //         console.log("Validation Successfull!!");
    //         console.log("the is error : " + fullNameError + emailError + passwordError + mobileError);


    //         // let data = {
    //         //     "email": this.state.emailOrPhone,
    //         //     "password": this.state.password
    //         // };
    //         // userService.login("/user/login", data)
    //         //     .then((res) => {
    //         //         console.log("User Logged in!");
    //         //         localStorage.setItem("id", res.data.id);
    //         //         localStorage.setItem("firstName", res.data.firstName);
    //         //         localStorage.setItem("lastName", res.data.lastName);
    //         //         localStorage.setItem("email", res.data.email);

    //         //         Auth.login(() => {
    //         //             this.props.history.push("/dashboard");
    //         //         })
    //         //     })
    //         //     .catch(error => {
    //         //         console.error('Error encountered!', error);
    //         //     });
    //     }
    //     else {
    //         console.log("Not Validated");
    //     }
    // }

    //password visibility
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const handlePasswordToggle = () => {
        setPasswordVisibility(!passwordVisibility)
    }

    const { handleSubmit, control } = useForm();
    const onSubmit = data => {
        console.log(data);
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
                            fullWidth style={{ paddingBottom: "10%", fontSize: "1px" }}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
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
                            fullWidth style={{ paddingBottom: "10%", fontSize: "1px" }}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
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
                                        helperText={error ? error.message : null}
                                        style={{ marginBottom: "10%" }}
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
                    name="mobile"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            size="small"
                            fullWidth
                            label="Mobile Number"
                            variant="outlined"
                            style={{ paddingBottom: "10%", fontSize: "1px" }}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                    )}
                    rules={{ required: 'Enter valid Mobile Number', pattern: /^([1-9][0-9])?[7-9][0-9]{9}$/ }}
                />
                <Button type="submit" fullWidth variant="contained" style={{ marginTop: "7px", textTransform: "none", background: "#A03037 0% 0% no-repeat padding-box", opacity: 1 }}>
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

export default SignUp
