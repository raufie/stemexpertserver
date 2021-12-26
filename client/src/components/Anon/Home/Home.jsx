import React, { Component } from 'react';
import { Box, Container, Typography, Button, makeStyles, Paper, createTheme, ThemeProvider } from '@material-ui/core';
import { Link } from "react-router-dom"
import { basicStyles } from '../../Styles/allstyles'

const Themes = createTheme({
    palette: {
        primary: {
            main: '#581845',
        },

        secondary: { main: '#224f21' },
    }
})
const useStyles = makeStyles({
    centerBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
    },
})
const useBasicStyles = makeStyles(basicStyles);
const Home = () => {
    const styles = useStyles();
    const basicStyles = useBasicStyles();

    return (
        <Box mt={8} py={5}>
            <Container maxWidth="md">
                <Paper elevation={1}>
                    <Box p={2} className={styles.centerBox}>
                        <Typography variant="h2" component="h1">StemExpert</Typography>
                    </Box>
                    <Box className={styles.centerBox} px={10}>
                        <Typography variant="h5">
                            StemExpert allows experts to share their knowledge and expertise with the community.
                            Experts share videos on their field of expertise, and the community can search for
                            those videos by topic. Get started by creating an account or signin in.
                        </Typography>
                    </Box>
                    <Box className={styles.centerBox} py={2} >
                        <Link to="/createprofile" className={basicStyles.linkStyle}>
                            <Button variant="contained" color="primary" >Create Profile</Button>
                        </Link>
                    </Box>
                </Paper>
                <Box m={4}>
                    <Paper elevation={1}>
                        <Box p={2} className={styles.centerBox}>
                            <Typography variant="h4" component="h1">Are you an expert?</Typography>
                        </Box>
                        <Box className={styles.centerBox} px={10}>
                            <Typography variant="h6" component="p">
                                Join StemExpert today and share your expertise with the community.
                                Submit an application by clicking the button below.
                            </Typography>
                        </Box>
                        <Box className={styles.centerBox} py={2} >
                            <Link to="/apply" className={basicStyles.linkStyle}>
                                <Button variant="contained" color="primary" >Apply to be an Expert</Button>
                            </Link>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </Box>
    )


}
export default Home;