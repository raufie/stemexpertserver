import React, { Component, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import storage from '../../config/fbConfig';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Box, Typography, Paper, CircularProgress, Grid, Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { basicStyles } from '../../Styles/allstyles';
import ReactPlayer from 'react-player/lazy'
import { ThumbUp, ThumbDown, RemoveRedEyeOutlined } from '@material-ui/icons'

import axiosInstance from '../../../services/axiosInstance'
const useBasicStyles = makeStyles(basicStyles);

const ExpertVideo = (props) => {
    const params = useParams()
    const navigateTo = useNavigate()
    const [videoUrl, setVideoUrl] = useState("")
    //expert
    const [isSubscribed, setSubscribed] = useState(false)
    const [videoInfo, setVideoInfo] = useState({})
    const [likesInfo, setLikesInfo] = useState(null)
    //deleting
    const [isDeleting, setIsDeleting] = useState(false)
    const [message, setMessage] = useState("")
    const styles = useBasicStyles();

    const downloadVideo = (id) => {
        const storageRef = ref(storage, `/videos/${id}`);
        getDownloadURL(storageRef).then(url => {
            setVideoUrl(url)
        }).catch(err => {
            console.log(err)
        })
    }
    const toggleSubscribe = () => {
        setSubscribed(!isSubscribed)
    }
    const handleLike = () => {

    }
    const handleDislike = () => {

    }
    useEffect(() => {
        setMessage("Loading Video...")
        try {
            axiosInstance.get("/experts/video/" + params.id).then(res => {
                setVideoInfo(
                    res.data.video
                )
                res.data.likes ? setLikesInfo(res.data.likes) : setLikesInfo(null)
                console.log(res.data)
                downloadVideo(res.data.video.filename)
            }).catch(e => {
                setMessage("404 Video not Found")
            })
            downloadVideo()
        } catch (e) {
            alert("error loading video")

            console.log(e)
        }


    }, [])
    const handleDelete = () => {
        setIsDeleting(true)

        if (window.confirm("Are you sure you want to delete this video?")) {
            axiosInstance.delete("/videos/" + params.id).then(res => {
                alert("successfully deleted")

                navigateTo("/")
            }).catch(e => {
                alert("error deleting video")
                console.log(e)
                setIsDeleting(false)

            })
        } else {
            setIsDeleting(false)
        }
    }
    if (videoUrl) {
        return (
            <Box my={10} mx={15}>
                <Paper>

                    <Box mx={10} py={3} className={styles.centerBox} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                        {videoUrl ?

                            <ReactPlayer url={videoUrl} playing={true}
                                autoplay
                                controls
                            /> : <CircularProgress />}
                    </Box>
                    <Box mx={12} my={4}>
                        <Paper elevation={3}>
                            <Typography variant="h4" component="h1">{videoInfo ? videoInfo.title : "loading"}</Typography>
                        </Paper>
                    </Box>
                    <Box mx={12} my={4}>

                        <Typography variant="h6" component="p">{videoInfo ? videoInfo.description : "loading"}</Typography>

                    </Box>
                    <Box display="flex" flexDirection="row">
                        <Box my={5} mx={12} display="flex" flexDirection="row">
                            <ThumbUp /><Typography variant="h6">{likesInfo ? likesInfo.nlikes : 0}</Typography>
                        </Box>
                        <Box my={5} mx={12} display="flex" flexDirection="row">
                            <ThumbDown /><Typography variant="h6">{likesInfo ? likesInfo.ndislikes : 0}</Typography>
                        </Box>
                        <Box my={5} mx={12} display="flex" flexDirection="row">
                            <RemoveRedEyeOutlined /><Typography variant="h6">{videoInfo ? videoInfo.views : "loading"}</Typography>
                        </Box>
                        <Box my={5} >
                            <Button variant="contained" color="primary" onClick={handleDelete} disabled={isDeleting}>Delete Video</Button>
                        </Box>
                    </Box>

                </Paper>
            </Box>)
    }
    else {
        return (
            <Box mx={10} my={10} py={3} className={styles.centerBox} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <Typography variant="h1"> {message}</Typography>
            </Box>
        )


    }
}

export default ExpertVideo;