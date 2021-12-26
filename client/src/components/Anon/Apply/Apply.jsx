import React, { Component, useState } from 'react';

import { Button, Grid, Container, Box, TextField, FormControlLabel, FormControl, FormLabel, MenuItem, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { basicStyles } from '../../Styles/allstyles';
import { Check, Add, Delete, Close } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import { apiUrl } from '../../config/config';
const useBasicStyles = makeStyles(basicStyles)
const Apply = () => {
    const [userInfo, setUserInfo] = useState({ links: [] })
    const [isUsernameAvailable, setUsernameAvailable] = useState(false)
    const [usernameJSX, setUsernameJSX] = useState(null)
    const [messageJSX, setMessageJSX] = useState(null)
    const styles = useBasicStyles();
    const handleChange = (e) => {

        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
        checkUsername(e.target.value)
    }
    const checkUsername = (username) => {
        setUsernameJSX(<CircularProgress />)
        axios.get(`${apiUrl}/experts/expertexists/${username}`).then(res => {
            if (res.data || username.length < 5) {
                setUsernameJSX(<Close fontSize="large" color="error" />)

                setUsernameAvailable(false)
            } else {
                setUsernameAvailable(true)
                setUsernameJSX(<Check fontSize="large" />)

            }
        }).catch(e => {
            alert("error checking username")
        })
    }
    const handleSubmit = (e) => {
        checkUsername(userInfo.username)
        e.preventDefault();
        if (isUsernameAvailable && userInfo.password.length >= 8 && userInfo.password == userInfo.password2) {
            axios.post(`${apiUrl}/experts/`, userInfo).then(res => {
                setMessageJSX(
                    <Box><Typography style={{ color: "green" }} variant="h6" component="p">Successfully created your expert profile, wait for verification by admin</Typography></Box>
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
    const handleAddLink = (e) => {
        setUserInfo({
            ...userInfo,
            links: [...userInfo.links, ""]
        }

        )
    }
    const handleLinkChange = (e, i) => {
        setUserInfo({
            ...userInfo,
            links: [
                ...userInfo.links.slice(0, i), e.target.value, ...userInfo.links.slice(i + 1)
            ]
        })
    }
    const handleDeleteLink = (key) => {
        setUserInfo({
            ...userInfo,
            links: userInfo.links.filter((link, i) => i !== key)
        })

    }
    return (
        <div>
            <Box my={8} mx={15} >
                <Box mt={10} mb={2} >
                    <Paper elevation={5}>
                        <Typography variant="h2" component="h1" className={styles.centerBox} >Apply to be an expert</Typography>
                    </Paper>
                </Box>
                <Box>
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
                                <Box>
                                    <TextField required color="primary" label="Education" onChange={handleChange} name="education"
                                        multiline rows={4} maxRows={6}
                                        className={styles.field} />
                                </Box>
                                <Box>

                                    <Typography variant="h6">Relevant Links</Typography>
                                    {userInfo.links.map((link, i) => {
                                        return <Paper>
                                            <Box>
                                                <TextField required color="primary" label="Link"
                                                    onChange={(e) => { handleLinkChange(e, i) }}
                                                    name="link" type="url" className={styles.field} value={link} />
                                                <Button color="primary" variant="contained" key={i} onClick={() => handleDeleteLink(i)} style={{ height: "100%" }}><Delete /></Button>

                                            </Box>
                                        </Paper>

                                    })}

                                    <Button color="primary" variant="contained" onClick={handleAddLink} style={{ height: "100%" }}><Add /></Button>

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
export default Apply;