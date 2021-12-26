import React, { Component, useEffect, useState } from 'react';
import { basicStyles } from '../../Styles/allstyles'
import { Paper, Box, Container, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
// components
import UserCard from '../../Shared/UserCard/UserCard';
const useStyle = makeStyles(basicStyles);
const About = () => {
    const styles = useStyle();
    const [userInfo, setUserInfo] = useState(undefined);

    useEffect(() => {
        axios.get(`https://api.github.com/users/raufie`).then(res => {
            setUserInfo({
                img: res.data.avatar_url,
                description: res.data.bio,
                name: res.data.name,
                link: res.data.html_url,
                type: "developer"
            }).catch(e => {
                console.log("error")
            });
            console.log(res.data)
        })
    }, [])
    return (
        <Container maxWidth="md">
            <Box my={12} >
                <Paper elevation={3} >
                    <Box p={2} className={styles.centerBox}>
                        <Typography variant="h2" component="h1">Welcome to Stemexpert</Typography>
                    </Box>
                    <Box className={styles.centerBox} px={10} pb={5}>
                        <Typography variant="h5">
                            StemExpert allows experts to share their knowledge and expertise with the community.
                            Experts share videos on their field of expertise, and the community can search for
                            those videos by topic.
                        </Typography>
                    </Box>
                </Paper>
            </Box>
            <Box my={12} >
                <Paper elevation={3} >
                    <Box p={2} className={styles.centerBox}>
                        <Typography variant="h2" component="h1">Development Team</Typography>
                    </Box>
                    {userInfo ? <UserCard info={userInfo} /> : <Box className={styles.centerBox}> <CircularProgress /></Box>}
                </Paper>
            </Box>
        </Container>
    )

}
export default About;