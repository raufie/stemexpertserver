import React, { Component, useState } from 'react';

import { Button, Grid, Container, Box, TextField, FormControlLabel, FormControl, FormLabel, MenuItem, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { basicStyles } from '../../Styles/allstyles';
import { Check, Close } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { apiUrl } from '../../config/config'

const useBasicStyles = makeStyles(basicStyles)
const CreateProfile = () => {
    const [userInfo, setUserInfo] = useState({})
    const [isUsernameAvailable, setUsernameAvailable] = useState(false)
    const [usernameJSX, setUsernameJSX] = useState(null)
    const [messageJSX, setMessageJSX] = useState(null)
    const styles = useBasicStyles();
    const handleChange = (e) => {

        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value

        })
        if (e.target.name == "username")
            checkUsername(e.target.value)

    }
    const checkUsername = (username) => {
        setUsernameJSX(<CircularProgress />)
        axios.get(`${apiUrl}/users/userexists/${username}`).then(res => {
            if (res.data || username.length < 5) {
                setUsernameJSX(<Close fontSize="large" color="error" />)

                setUsernameAvailable(false)
            } else {
                setUsernameAvailable(true)
                setUsernameJSX(<Check fontSize="large" />)

            }
        })
    }
    const handleSubmit = (e) => {
        checkUsername(userInfo.username)
        e.preventDefault();
        console.log(userInfo)
        if (isUsernameAvailable && userInfo.password.length >= 8 && userInfo.password == userInfo.password2) {
            axios.post(`${apiUrl}/users/`, userInfo).then(res => {
                setMessageJSX(
                    <Box><Typography style={{ color: "green" }} variant="h6" component="p">Successfully created your profile, sign in now</Typography></Box>
                )
            }).catch(err => {
                setMessageJSX(
                    <Box><Typography style={{ color: "red" }} variant="h6" component="p">{err.response.data.message}</Typography></Box>
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
                        <Typography variant="h2" component="h1" className={styles.centerBox} >Create Profile</Typography>
                    </Paper>
                </Box>
                <Box mx="20%">
                    <Paper elevation={3}>

                        <Box mx={10} className={styles.centerBox}>
                            <form onSubmit={handleSubmit}>
                                <Box >
                                    <TextField required color="primary" label="First Name" onChange={handleChange} name="firstname" className={styles.field} />
                                </Box>
                                <Box>
                                    <TextField required color="primary" label="Last Name" onChange={handleChange} name="lastname" className={styles.field} />
                                </Box>
                                <Box >
                                    <TextField required color="primary" label="Username" onChange={handleChange} name="username" className={styles.field} />
                                    {usernameJSX}
                                </Box>
                                <Box>
                                    <TextField required color="primary" label="Age" onChange={handleChange} name="age" type="number" className={styles.field} />
                                </Box>
                                <Box>
                                    <TextField required color="primary" label="Password" onChange={handleChange} name="password" type="password" className={styles.field} />
                                </Box>
                                <Box>
                                    <TextField required color="primary" label="Re-enter Password" onChange={handleChange} name="password2" type="password" className={styles.field} />
                                </Box>
                                <Box my={2} >
                                    <Button type="submit" color="primary" variant="contained" >Create Profile</Button>
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
export default CreateProfile;