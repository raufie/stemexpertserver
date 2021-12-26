import React, { Component, useEffect, useState } from 'react';
import { Paper, Card, Box, Container, Typography, CardContent, CardMedia, Grid, makeStyles, Button, IconButton } from '@material-ui/core';
import { basicStyles } from '../../Styles/allstyles';
import { Link as LinkIcon, OndemandVideo as WatchIcon, ThumbUp, RemoveRedEyeOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom'
import { ref, getDownloadURL } from 'firebase/storage';
import storage from '../../config/fbConfig'
import axiosInstance from '../../../services/axiosInstance'
const useBasicStyles = makeStyles(basicStyles);

const VideoCard = (props) => {
    //thumbnail(img), description, link(video id)
    const styles = useBasicStyles();
    const [videoInfo, setVideoInfo] = useState({})
    const [likes, setLikes] = useState(0)
    useEffect(() => {
        const storageRef = ref(storage, `/profile_pics/${props.info.thumbnail}`);
        getDownloadURL(storageRef, `/profile_pics/${props.info.thumbnail}`).then(url => {
            setVideoInfo(
                {
                    thumb_url: url,
                }
            )

        }).catch(err => {
            console.log("error loading thumbnail")
        })
        console.log(props.info)
        axiosInstance.get(`/videos/${props.info._id}/expert/likes`).then(res => {
            console.log(res.data.nlikes)
            if (res.data.nlikes) {
                setLikes(res.data.nlikes)
            } else {
                setLikes(0)
            }

        }).catch(e => {
            console.log(e)
        })


    }, [])
    return (
        <Container maxWidth="md">


            <Box mx={1} my={1}>
                <Card elevation={3} >
                    <CardContent >
                        <Box className={styles.centerBox}>

                            <CardMedia component="img" image={videoInfo.thumb_url} alt="video thumbnail" className={styles.thumb_img} />
                        </Box>
                    </CardContent>
                    <Box className={styles.centerBox} mx={1}>
                        <Typography style={{ fontSize: '100%' }} variant="h5" component="h2" className={styles.centerBox} className={styles.limitLines}>{props.info.description}</Typography>
                    </Box>
                    <Box className={styles.centerBox} my={2}>
                        <Link className={styles.linkStyle} to={`/video/${props.info._id}`} className={styles.linkStyle} >
                            <Button variant="contained" color={"primary"} startIcon={<WatchIcon />}><Typography>Watch Now</Typography></Button>
                        </Link>
                    </Box>
                    <Box className={styles.centerBox}>
                        <Typography>
                            {props.info.views}<IconButton><RemoveRedEyeOutlined /></IconButton>
                        </Typography>
                        <Typography>
                            {likes}<IconButton><ThumbUp /></IconButton>
                        </Typography>
                    </Box>

                </Card>
            </Box>





        </Container >

    )
}
export default VideoCard;