import React, { Component, useState, useEffect } from 'react';
import {
    Paper, Card, Box, Container, Typography,
    CardContent, CardMedia, Grid, makeStyles, Button,
    TextField, FormControl, FormLabel, FormControlLabel
} from '@material-ui/core';
import { Link, navigateTo } from 'react-router-dom';
// only change password
import { basicStyles } from '../../Styles/allstyles';
import { ref, getDownloadURL, uploadBytesResumable as uploadBytes } from "firebase/storage";
import storage from '../../config/fbConfig';
import { CloudUpload, CheckCircleSharp as Check } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import { v1 as uuid } from 'uuid';
import axiosInstance from '../../../services/axiosInstance';
const useBasicStyles = makeStyles(basicStyles);
const ExpertUserProfile = (props) => {
    const styles = useBasicStyles()
    const [videoInfo, setVideoInfo] = useState({})
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedThumbnail, setThumbnailFile] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0)

    const [isUploading, setIsUploading] = useState(false)
    const [message, setMessage] = useState('')
    const [videoJSX, setVideoJSX] = useState(null)
    const [isButtonClickable, setButtonClickable] = useState(true)
    const handleFileSubmit = (e) => {
        e.preventDefault()
        if (selectedFile.type == "video/mp4") {
            setMessage("")

            handleFileUpload()
        } else {
            setMessage("Please select a file")
        }
    }
    const handleSelectedFileChange = (e) => {
        if (e.target.files[0].type === "video/mp4") {
            setSelectedFile(e.target.files[0])
            setMessage("")
        } else {
            setMessage("Please select a valid MP4 video file")
        }
        console.log(e.target.files[0])
    }
    const handleSelectedThumbnailChange = (e) => {
        if (e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png") {
            setThumbnailFile(e.target.files[0])
            setMessage("")
        } else {
            setMessage("Please select a valid image file(only png and jpg allowed)")
        }
    }
    const handleChange = (e) => {
        setVideoInfo({
            ...videoInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleFileUpload = () => {
        setButtonClickable(false)

        const uid = uuid()
        const uid2 = uuid()


        axiosInstance.post('/videos/', {
            title: videoInfo.title,
            description: videoInfo.description,
            thumbnail: `${selectedThumbnail.name}${uid2}`,
            filename: `${selectedFile.name}${uid}`
        }).then(res => {
            setVideoJSX(
                <Box className={styles.centerBox}>
                    Video will be available at (once uploaded) <Link target="_blank" to={`/video/${res.data._id}`}>Link </Link>
                </Box>
            )
        }).catch(err => {
            <Box className={styles.centerBox}>
                error uploading video
            </Box>
        })
        const storageRef = ref(storage, `/videos/${selectedFile.name}${uid}`);
        setIsUploading(true)
        const task = uploadBytes(storageRef, selectedFile)
        task.on("state_changed", snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setUploadProgress(progress)


        }, (err) => {
            alert("error uploading file")

        }, () => {
            console.log("successfully uploaded")
            getDownloadURL(task.snapshot.ref).then((downloadURL) => {


                setMessage('Video Uploaded, please dont close this yet');
                console.log(downloadURL)
                //uploading picture
                const storageRef = ref(storage, "/profile_pics/" + selectedThumbnail.name + `${uid2}`);
                setIsUploading(true)
                const task = uploadBytes(storageRef, selectedThumbnail)
                task.on("state_changed", snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setUploadProgress(progress)
                }, (err) => {
                    alert("error uploading file")

                }, () => {
                    console.log("successfully uploaded")
                    setMessage('Thumbnail Uploaded, you may leave this site if you wish');
                    setButtonClickable(true)

                    clearForms()
                }
                )
            });

            setIsUploading(false)
        }
        )

    }
    const clearForms = () => {
    }
    useEffect(() => {

    }, [])
    return (
        <Box mx={"20%"} my={10}>
            <Typography variant="h2" component="h2" className={styles.centerBox}>Upload New Video</Typography>


            <Paper elevation={3}>
                <form onSubmit={handleFileSubmit}>
                    <Box className={styles.centerBox}>
                        <TextField required color="primary" label="Title" onChange={handleChange} name="title" className={styles.field} />
                    </Box>
                    <Box className={styles.centerBox}>
                        <TextField required color="primary" label="Description" onChange={handleChange} name="description" className={styles.field} />
                    </Box>

                    <Box>
                        <Typography variant="h5" component="h1" className={styles.centerBox}>Please select a video file</Typography>
                    </Box>
                    <Box className={styles.centerBox} display="flex" flexDirection="column">
                        <Button color="primary" variant="contained" endIcon={<CloudUpload />} >
                            <input required type="file" onChange={handleSelectedFileChange} />Select Video</Button>
                    </Box>
                    <Box>
                        <Typography variant="h5" component="h1" className={styles.centerBox}>Please select a Thumbnail</Typography>
                    </Box>
                    <Box className={styles.centerBox} display="flex" flexDirection="column">
                        <Button color="primary" variant="contained" endIcon={<CloudUpload />} >
                            <input required type="file" onChange={handleSelectedThumbnailChange} />Select Video</Button>

                        {isUploading ?
                            <Box my={5}> <CircularProgress style={{ fontSize: 50 }} variant="determinate" value={uploadProgress} /> </Box> : null}
                        {uploadProgress == 100 ? <Check /> : null}
                        {videoJSX}
                    </Box>
                    <Box my={3} className={styles.centerBox}>
                        <Button color="primary" variant="contained" type="submit" disabled={!isButtonClickable}>Start Uploading</Button>
                    </Box>

                    <Box className={styles.centerBox}>
                        <Typography variant="h5" component="h1" style={{ color: "red" }} className={styles.centerBox}>{message}</Typography>
                    </Box>
                </form>
            </Paper>

        </Box>
    )
}

export default ExpertUserProfile;