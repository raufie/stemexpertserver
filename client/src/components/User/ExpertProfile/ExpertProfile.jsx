import React, { Component, useEffect, useState } from 'react';
import { Paper, Card, Box, Container, Typography, CardContent, CardMedia, Grid, makeStyles, Button } from '@material-ui/core';
import { basicStyles } from '../../Styles/allstyles';
import { Link as LinkIcon } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import VideoCard from '../../Shared/VideoCard/VideoCard';
import ExpertCard from '../../Shared/ExpertCard/ExpertCard';
import { CircularProgress } from '@material-ui/core';
import axiosInstance from '../../../services/axiosInstance'
const ExpertProfile = () => {

    const [expertProfile, setExpertProfile] = useState({
        expert: {
            name: '',
            picture: '',
            education: '',
        }
    });
    const [hasExpertLoaded, setExpertLoaded] = useState(false)
    const [isSubscribed, setSubscribed] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const params = useParams()
    const loadProfile = () => {

    }
    useEffect(
        () => {
            axiosInstance.get("/experts/" + params.id).then(res => {
                setExpertProfile(res.data)
                setExpertLoaded(true)
                axiosInstance.get(`/experts/issubscribed/${expertProfile.expert._id}`).then(res => {
                    setSubscribed(res.data)
                    console.log(res.data)
                }).catch(e => {
                    console.log(e)

                })
            }).catch(e => {
                console.log(e)
            })


        }, [hasExpertLoaded])
    const toggleSubscribe = () => {
        setLoading(true)
        if (isSubscribed) {
            axiosInstance.post(`/experts/${expertProfile.expert._id}/unsubscribe`).then(res => {
                setSubscribed(false)
                setLoading(false)

            }).catch(e => {
                console.log("error subscribing video")
                console.log(e)
                setLoading(false)

            })
        } else {
            axiosInstance.post(`/experts/${expertProfile.expert._id}/subscribe`).then(res => {
                setSubscribed(true)
                setLoading(false)

            }).catch(e => {
                console.log("error unsubscribing video")
                setLoading(false)

            })
        }
    }
    return (

        <Box mt={10} mx={10}>
            <Box>
                <Paper elevation={3} >
                    {expertProfile == {} ? <CircularProgress /> :
                        <Grid container >
                            <Grid item md={3}>
                                <ExpertCard isProfile={true} info={expertProfile ? expertProfile.expert : null} />
                            </Grid>
                            <Grid item md={9} container direction="column">

                                <Grid item md={8}>
                                    <Box mt={1}>
                                        <Typography variant="h6" component="p" >{expertProfile ? expertProfile.expert.education : null}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item md={4}>
                                    <Box mt={1}>

                                        {isSubscribed ?
                                            <Button variant="contained" color="info" onClick={toggleSubscribe}>
                                                Subscribed</Button>
                                            : <Button variant="contained" color="primary" onClick={toggleSubscribe}>
                                                Subscribe</Button>}

                                    </Box>

                                </Grid>
                            </Grid>
                        </Grid>}
                    <Box mx={1} my={1}>

                        <Grid container >

                            {!expertProfile.videos ? <CircularProgress /> :

                                expertProfile.videos.map(video => {
                                    return (
                                        <Grid item md={3}> <VideoCard info={video} /></Grid>
                                    )
                                })

                            }
                        </Grid>

                    </Box>
                </Paper>
            </Box>
            <Box>

            </Box>
        </Box >
    )


}
export default ExpertProfile;