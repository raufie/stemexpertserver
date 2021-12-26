import React, { Component } from 'react';
import { Paper, Card, Box, Container, Typography, CardContent, CardMedia, Grid, makeStyles, Button } from '@material-ui/core';
import { basicStyles } from '../../Styles/allstyles';
import { Link } from '@material-ui/icons';
const useBasicStyles = makeStyles(basicStyles);

const UserCard = (props) => {
    // name, description, image, action/link
    // can expect developer or expert.. developer is only in one place
    //props.type == "developer" || "expert", name description img remain same still
    const styles = useBasicStyles();

    return (
        <Container maxWidth="md">

            <Grid container spacing={3} >
                <Grid md={4} >
                    <Box mx={1} my={1}>
                        <Card elevation={3} >
                            <CardContent >
                                <Box className={styles.centerBox}>
                                    <CardMedia component="img" image={props.info.img} alt="user image" className={styles.card_img} />
                                </Box>
                            </CardContent>
                            <Typography variant="h5" component="h2" className={styles.centerBox}>{props.info.name}</Typography>

                            <Box mx={1} my={1} className={styles.centerBox}>
                                <a className={styles.linkStyle} href={props.info.link} target="_blank">
                                    <Button variant="contained" color={"primary"} startIcon={<Link />}><Typography>Open Profile</Typography></Button>
                                </a>
                            </Box>

                        </Card>
                    </Box>
                </Grid>
                <Grid md={8} container direction={"column"}>
                    <Grid md={7} >
                        <Box mx={1} my={1} >
                            <Paper elevation={3} noWrap={true} >
                                <Typography variant="paragraph" component="p" className={styles.limitLines} >{props.info.description}
                                </Typography>
                            </Paper>
                        </Box>
                    </Grid>

                </Grid>
            </Grid>


        </Container>

    )
}
export default UserCard;