import React, { Component, useState, useEffect } from 'react';
import { Box, Container, Paper, Grid, Typography, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { CircularProgress, IconButton } from '@material-ui/core';
import { basicStyles } from '../../Styles/allstyles'
import VideoCard from '../../Shared/VideoCard/VideoCard'
import ExpertCard from '../../Shared/ExpertCard/ExpertCard'
import axiosInstance from '../../../services/axiosInstance';
const useBasicStyles = makeStyles(basicStyles)
//
const UserHome = (props) => {
    const styles = useBasicStyles();
    const [videos, setVideos] = useState([]);
    const [experts, setExperts] = useState([])
    const navigateTo = useNavigate();
    useEffect(() => {
        axiosInstance.get("/users/videos").then(res => {
            console.log(res.data)
            setVideos(res.data)
        }).catch(e => {
            console.log("error getting videos")
        })
        axiosInstance.get("/users/subscriptions").then(res => {
            setExperts(res.data)
        }).catch(e => {
            console.log("error getting subscriptions")
        })

    }, [])
    return (
        <Box mt={10} mx={8}>
            <Paper elevation={3}>
                <Box ml={4} my={2}> <Typography variant="h3" compotion="h1" >Suggestions</Typography>
                    {videos == [] ? null : "please subscribe to some experts to get their suggestions"}

                </Box>

                <Grid container spacing={5} >
                    {videos.map((video, index) => {
                        return (
                            <Grid md={3} key={index}>
                                <Box >
                                    <VideoCard info={video} />
                                </Box>
                            </Grid>)
                    })}
                </Grid>
                <Box ml={4} my={2}> <Typography variant="h3" compotion="h1" >Experts</Typography>
                    {experts == [] ? null : "please subscribe to some experts"}
                </Box>

                <Grid container spacing={5} >
                    {experts.map((expert, index) => {
                        return (
                            <Grid md={3} key={index}>
                                <Box >
                                    <ExpertCard info={expert} />
                                </Box>
                            </Grid>)
                    })}
                </Grid>
            </Paper>
        </Box>
    )

}
export default UserHome;