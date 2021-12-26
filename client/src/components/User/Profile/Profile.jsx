import React, { Component, useState } from 'react';
import {
    Paper, Card, Box, Container, Typography,
    CardContent, CardMedia, Grid, makeStyles, Button,
    TextField, FormControl, FormLabel, FormControlLabel
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../services/axiosInstance'
// only change password
import { basicStyles } from '../../Styles/allstyles';
const useBasicStyles = makeStyles(basicStyles);
const Profile = (props) => {
    const styles = useBasicStyles()
    const [passwordInfo, setPasswordInfo] = useState({})
    const handleChange = (e) => {
        setPasswordInfo({
            ...passwordInfo,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (passwordInfo.newpassword == passwordInfo.retypedpassword) {
            axiosInstance.put("/users/changepassword",
                {
                    newpassword: passwordInfo.newpassword,
                    oldpassword: passwordInfo.oldpassword
                }).then(res => {
                    alert("your password has been updated")
                }).catch(e => {
                    alert("error updating your password")
                })
        }
    }
    return (
        <Box mx={"20%"} my={10}>
            <Typography variant="h5" component="h2" className={styles.centerBox}>Change Password</Typography>
            <Paper elevation={3}>

                <Box mx={10} className={styles.centerBox}>
                    <form onSubmit={handleSubmit}>
                        <Box >
                            <TextField required color="primary" label="Old Password" onChange={handleChange} name="oldpassword" className={styles.field} />
                        </Box>
                        <Box>
                            <TextField required color="primary" label="New Password" onChange={handleChange} name="newpassword" className={styles.field} />
                        </Box>
                        <Box>
                            <TextField required color="primary" label="Retype New Password" onChange={handleChange} name="retypedpassword" className={styles.field} />
                        </Box>


                        <Box my={2} >
                            <Button type="submit" color="primary" variant="contained" >Change Password</Button>
                        </Box>
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}

export default Profile;