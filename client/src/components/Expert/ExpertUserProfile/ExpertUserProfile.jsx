import React, { Component, useState, useEffect } from 'react';
import {
    Paper, Card, Box, Container, Typography,
    CardContent, CardMedia, Grid, makeStyles, Button,
    TextField, FormControl, FormLabel, FormControlLabel
} from '@material-ui/core';
import { Link } from 'react-router-dom';
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
    const [passwordInfo, setPasswordInfo] = useState({})
    const [profilePicUrl, setProfilePicUrl] = useState({})
    const [selectedPicture, setSelectedPicture] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const [isSuccessfullyUploaded, setSuccessfullyUploaded] = useState(false)
    const handleChange = (e) => {
        setPasswordInfo({
            ...passwordInfo,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {

        e.preventDefault()
        if (passwordInfo.newpassword == passwordInfo.retypedpassword) {
            axiosInstance.put(`/experts/changepassword/`, {
                oldpassword: passwordInfo.oldpassword,
                newpassword: passwordInfo.newpassword
            }).then(res => {
                alert("password successfully updated")
            }).catch(e => {
                if (e.response.data.message) {
                    alert(e.response.data.message)
                } else {
                    alert("error updating password")
                }
            })
        }
    }
    const downloadProfilePicture = (picture) => {

        const storageRef = ref(storage, `/profile_pics/${picture}`);
        getDownloadURL(storageRef, `/profile_pics/${picture}`).then(url => {
            setProfilePicUrl(url)
            console.log(url)
        }).catch(err => {
            console.log(err)
        })

    }
    const handleFileSubmit = (e) => {
        e.preventDefault()
        handleFileUpload()

    }
    const handleSelectedFileChange = (e) => {
        setSelectedPicture(e.target.files[0])
    }
    const handleFileUpload = () => {
        const name = selectedPicture.name + `${uuid()}`
        const storageRef = ref(storage, "/profile_pics/" + name);
        setIsUploading(true)
        const task = uploadBytes(storageRef, selectedPicture)
        task.on("state_changed", snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setUploadProgress(progress)
        }, (err) => {
            alert("error uploading file")

        }, () => {
            console.log(name)
            axiosInstance.put("/experts/changepicture", { picture: name }).then(res => {
                alert("picture updated")
            }).catch(e => {
                alert("error updating picture")
            })

            console.log("successfully uploaded")
            window.location.reload()
            setIsUploading(false)
        }
        )
    }

    useEffect(() => {
        axiosInstance.get(`/experts/info`).then(res => {
            downloadProfilePicture(res.data.picture)

        }).catch(e => {
            console.log(e)
        })
    }, [])
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
            <Typography variant="h5" component="h2" className={styles.centerBox}>Change Profile Picture</Typography>
            <Paper elevation={3}>
                <form onSubmit={handleFileSubmit}>
                    <Box className={styles.centerBox}>
                        <Card elevation={3}>
                            <CardMedia component="img" image={profilePicUrl} title="Profile Picture" className={styles.thumb_img} />
                            Current Image
                        </Card>
                    </Box>
                    <Box>
                        <Typography variant="h5" component="h1" className={styles.centerBox}>Upload new picture</Typography>
                    </Box>
                    <Box className={styles.centerBox} display="flex" flexDirection="column">


                        <Button color="primary" variant="contained" endIcon={<CloudUpload />} >
                            <input type="file" onChange={handleSelectedFileChange} />Select Picture</Button>

                        <Box my={5}>
                            <Button color="primary" variant="contained" type="submit">Start Uploading</Button>
                        </Box>
                        {isUploading ?
                            <CircularProgress variant="determinate" value={uploadProgress} /> : null}
                        {uploadProgress == 100 ? <Check /> : null}

                    </Box>
                </form>
            </Paper>

        </Box>
    )
}

export default ExpertUserProfile;