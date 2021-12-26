import React, { Component, useState } from 'react';

import {
    Button, Grid, Container, Box, TextField, FormControlLabel, FormControl, FormLabel,
    MenuItem, Paper, Typography, RadioGroup, Radio
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { basicStyles } from '../../Styles/allstyles';
import { Check } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import { apiUrl } from '../../config/config';
import { useNavigate } from 'react-router-dom'
const useBasicStyles = makeStyles(basicStyles)
const SignIn = () => {
    const [userInfo, setUserInfo] = useState({ type: "user" })
    const [messageJSX, setMessageJSX] = useState(null)
    const styles = useBasicStyles();
    const navigateTo = useNavigate()
    const handleChange = (e) => {

        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value

        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInfo.type == "user") {
            axios.post(`${apiUrl}/users/signin`, userInfo).then(res => {
                localStorage.setItem("token", res.data.token)

                setMessageJSX(
                    <Box><Typography style={{ color: "green" }} variant="h6" component="p">Successfully signed in</Typography></Box>
                )
                navigateTo("/")
                window.location.reload()

            }).catch(e => {
                setMessageJSX(
                    <Box><Typography style={{ color: "red" }} variant="h6" component="p">{e.response.data.message}</Typography></Box>
                )
            })

        } else if (userInfo.type == "expert") {
            axios.post(`${apiUrl}/experts/signin`, userInfo).then(res => {
                localStorage.setItem("token", res.data.token)

                setMessageJSX(
                    <Box><Typography style={{ color: "green" }} variant="h6" component="p">Successfully signed in</Typography></Box>
                )
                navigateTo("/")
                window.location.reload()
            }).catch(e => {
                setMessageJSX(
                    <Box><Typography style={{ color: "red" }} variant="h6" component="p">{e.response.data.message}</Typography></Box>
                )
            })

        }
    }
    const isUserInfoValid = () => {
    }
    return (
        <div>
            <Box my={8} mx={15} >
                <Box mt={10} mb={2} >
                    <Paper elevation={5}>
                        <Typography variant="h2" component="h1" className={styles.centerBox} >Sign In</Typography>
                    </Paper>
                </Box>
                <Box mx={"20%"}>
                    <Paper elevation={3}>

                        <Box mx={10} className={styles.centerBox}>
                            <form onSubmit={handleSubmit}>
                                <Box >
                                    <TextField required color="primary" label="Username" onChange={handleChange} name="username" className={styles.field} />
                                </Box>
                                <Box>
                                    <TextField required color="primary" label="Password" onChange={handleChange} name="password" className={styles.field} />
                                </Box>
                                <Box >
                                    <FormControl>
                                        <FormLabel>Sign In as</FormLabel>
                                        <RadioGroup required name="type" onChange={handleChange} value={userInfo.type} style={{ display: "flex", flexDirection: "row" }}>
                                            <FormControlLabel value="expert" control={<Radio color="primary" />} label="Expert" />
                                            <FormControlLabel value="user" control={<Radio color="primary" />} label="User" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>

                                <Box my={2} >
                                    <Button type="submit" color="primary" variant="contained" >Sign In</Button>
                                </Box>
                                {messageJSX}
                            </form>
                        </Box>
                    </Paper>

                </Box>
            </Box>
        </div >
    )
}
export default SignIn;