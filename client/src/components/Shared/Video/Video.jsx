import React, { Component, useState, useEffect } from 'react';
import storage from '../../config/fbConfig';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Box, Typography, Paper, CircularProgress, Grid, Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { basicStyles } from '../../Styles/allstyles';
import ExpertCard from '../ExpertCard/ExpertCard';
import ReactPlayer from 'react-player/lazy'
import { ThumbUp, ThumbDown } from '@material-ui/icons'
import axiosInstance from '../../../services/axiosInstance'
import { useParams } from 'react-router-dom'
const useBasicStyles = makeStyles(basicStyles);
const Video = (props) => {
    const [videoUrl, setVideoUrl] = useState("")
    const [videoInfo, setVideoInfo] = useState({})
    const [likesInfo, setLikesInfo] = useState(null)
    const [likeInfo, setLikeInfo] = useState('none')
    const [message, setMessage] = useState("")
    const params = useParams()
    //expert
    const [expertProfile, setExpertProfile] = useState({})
    const [isSubscribed, setSubscribed] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isLoaded, setLoaded] = useState(false)
    const styles = useBasicStyles();

    const downloadVideo = (id) => {
        const storageRef = ref(storage, `/videos/${id}`);
        getDownloadURL(storageRef).then(url => {
            console.log(url)
            setVideoUrl(url)
        }).catch(err => {
            console.log(err)
        })
    }
    const toggleSubscribe = () => {
        setLoading(true)
        if (isSubscribed) {
            axiosInstance.post(`/experts/${videoInfo.uploaderId}/unsubscribe`).then(res => {
                setSubscribed(false)
                setLoading(false)

            }).catch(e => {
                console.log("error subscribing video")
                console.log(e)
                setLoading(false)

            })
        } else {
            axiosInstance.post(`/experts/${videoInfo.uploaderId}/subscribe`).then(res => {
                setSubscribed(true)
                setLoading(false)

            }).catch(e => {
                console.log("error unsubscribing video")
                setLoading(false)

            })
        }
    }
    const handleLike = () => {
        setLoading(true)
        if (likeInfo != 'like') {
            axiosInstance.post(`/videos/${params.id}/like`, { like: "like" }).then(res => {
                setLikeInfo('like')
                setLoading(false)
                console.log(res.data)

            }).catch(e => {
                console.log("error liking video")
                console.log(e)
                setLoading(false)
            })
        } else {
            axiosInstance.post(`/videos/${params.id}/like`, { like: "none" }).then(res => {
                setLikeInfo('none')
                setLoading(false)

            }).catch(e => {
                console.log("error liking video")
                console.log(e)
                setLoading(false)
            })
        }
    }
    const handleDislike = () => {
        setLoading(true)
        if (likeInfo !== 'dislike') {
            axiosInstance.post(`/videos/${params.id}/like`, { like: "dislike" }).then(res => {
                setLikeInfo('dislike')
                setLoading(false)
                console.log(res.data)

            }).catch(e => {
                console.log("error disliking video")
                console.log(e)
                setLoading(false)
            })
        } else {
            axiosInstance.post(`/videos/${params.id}/like`, { like: "none" }).then(res => {
                setLikeInfo('none')
                setLoading(false)

            }).catch(e => {
                console.log("error liking video")
                console.log(e)
                setLoading(false)
            })
        }
    }
    useEffect(() => {
        setMessage("Loading Video...")
        try {
            axiosInstance.get("/videos/" + params.id).then(res => {
                setVideoInfo(
                    res.data.video
                )
                res.data.likes ? setLikesInfo(res.data.likes) : setLikesInfo(null)
                console.log(res.data)
                downloadVideo(res.data.video.filename)
                axiosInstance.get(`/experts/${res.data.video.uploaderId}`).then(res => {

                    setExpertProfile(res.data.expert)

                }).catch(e => {
                    setMessage("error fetching user profile")
                })
                setLoaded(true)

            }).catch(e => {
                setMessage("404 Video not Found")
            })

        } catch (e) {
            alert("error loading video")

            console.log(e)
        }
        axiosInstance.get(`/experts/issubscribed/${videoInfo.uploaderId}`).then(res => {
            setSubscribed(res.data)
        }).catch(e => {

        })
        axiosInstance.get(`/videos/${params.id}/like`).then(res => {
            if (res.data) {
                console.log(res.data.like)
                setLikeInfo(res.data.like)
            } else {
                setLikeInfo('none')
            }
            console.log(res.data)
        }).catch(e => {
            console.log(e)
        })

    }, [isLoaded])
    return (
        <Box my={10} mx={15}>
            <Paper>

                <Box mx={10} py={3} className={styles.centerBox} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    {videoUrl ?

                        <ReactPlayer url={videoUrl}
                            playing={true}
                            autoplay
                            controls
                        /> : <CircularProgress />}
                </Box>
                <Box mx={12} my={4}>
                    <Paper elevation={3}>
                        <Typography variant="h4" component="h1">{videoInfo.title}</Typography>
                    </Paper>
                </Box>
                <Grid container spacing={3}>
                    <Grid item md={1}>

                    </Grid>
                    <Grid item md={3}>
                        <ExpertCard info={expertProfile} isProfile={false} />
                    </Grid>
                    <Grid item md={5}>
                        {isLoading ? <CircularProgress /> : null}
                    </Grid>
                    <Grid item md={2} container direction="column">
                        <Grid item md={8}>
                            <Typography variant="h6" component="h2">
                                {
                                    isSubscribed ? <Button variant="contained" color="info" onClick={toggleSubscribe}>Unsubscribe</Button> :
                                        <Button variant="contained" color="primary" onClick={toggleSubscribe}>Subscribe</Button>}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Box>
                                <IconButton onClick={handleLike}>
                                    <ThumbUp style={likeInfo === 'like' ? { fill: "black" } : {}} />
                                </IconButton>
                                <IconButton onClick={handleDislike} >
                                    <ThumbDown style={likeInfo === 'dislike' ? { fill: "black" } : {}} />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>)
}

export default Video;