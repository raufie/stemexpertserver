import React, { Component, useEffect, useState } from 'react';
import { Paper, Card, Box, Container, Typography, CardContent, CardMedia, Grid, makeStyles, Button } from '@material-ui/core';
import { basicStyles } from '../../Styles/allstyles';
import { Link as LinkIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { ref, getDownloadURL } from 'firebase/storage'
import storage from '../../config/fbConfig'
const useBasicStyles = makeStyles(basicStyles);

const ExpertCard = (props) => {
    const [img, setImg] = useState(null)
    const styles = useBasicStyles();

    useEffect(() => {
        if (props.info) {
            const storageRef = ref(storage, `/profile_pics/${props.info.picture}`);
            getDownloadURL(storageRef, `/profile_pics/${props.info.picture}`).then(url => {
                setImg(url)
                console.log(url)
            }).catch(err => {
                console.log(err)

            })
        }
    }, [props]);
    return (
        <Container maxWidth="md">


            <Box mx={1} my={1}>
                <Card elevation={3} >
                    <CardContent >
                        <Box className={styles.centerBox}>

                            <CardMedia component="img" image={img} alt="user image" className={styles.card_img} />
                        </Box>
                    </CardContent>
                    <Typography variant="h5" component="h2" className={styles.centerBox}>{props.info.name}</Typography>
                    {!props.isProfile ?
                        <Box mx={1} my={1} className={styles.centerBox}>
                            <Link className={styles.linkStyle} to={`/expert/${props.info._id}`} >
                                <Button variant="contained" color={"primary"} startIcon={<LinkIcon />}><Typography>Open Profile</Typography></Button>
                            </Link>
                        </Box>
                        : null}
                </Card>
            </Box>



        </Container>

    )
}
export default ExpertCard;