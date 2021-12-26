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
const ExpertHome = (props) => {
    const styles = useBasicStyles();
    const [videos, setVideos] = useState([]);
    const [experts, setExperts] = useState([])
    const navigateTo = useNavigate();
    useEffect(() => {

        axiosInstance.get("/experts/videos/mostviewed").then(res => {
            setVideos(res.data)
        }
        ).catch(e => {
            console.log(e)
        }
        )


    }, [])
    return (
        <Box mt={10} mx={8}>
            <Paper elevation={3}>
                <Box ml={4} my={2}> <Typography variant="h3" compotion="h1" >Your Most Viewed Videos</Typography>
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



            </Paper>
        </Box>
    )

}
export default ExpertHome;