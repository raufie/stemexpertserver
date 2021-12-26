import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar, Box, Toolbar,
    Typography, Grid, Paper,
    Button, makeStyles, createTheme, ThemeProvider, Container
} from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#581845',
        },
        secondary: { main: '#224f21' },
        button: {
            main: '#22f234'
        }
    },
})
const buttonTheme = createTheme({
    palette: {
        primary: {
            main: '#F2EB7E',

        },
        secondary: { main: '#BDA420' },
    }
})
const useStyles = makeStyles({

    root: {
        display: "flex",
    },
    alignAndCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
    },
    alignAndRight: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flexGrow: 1,
    },
    linkButton: {
        color: 'white',
        '&:hover': {
            color: '#581845',
            backgroundColor: "#f2eb7e"
        }
    },
    btn: {
        "&:hover": {
            backgroundColor: '#db3288',
            color: 'white'
        },
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    },
    appbar: {
        backgrondColor: "white",
    },

})
const Navbar = (props) => {
    const styles = useStyles()
    return (

        <AppBar className={styles.root} color="primary" className={styles.appbar}>
            <Toolbar>
                <Grid container  >
                    <Grid md={4} className={styles.alignAndCenter} >
                        <Box >
                            <Link to="/" className={styles.link}>
                                <Typography variant="h5" component="p">StemExpert</Typography>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid md={4} className={styles.alignAndCenter}>
                        <Link to="/" className={styles.link}>
                            <Button variant="outlined" className={styles.buttonMargin} className={styles.linkButton}>
                                Home
                            </Button>
                        </Link>
                        <Link to="/about" className={styles.link}>
                            <Button variant="outlined" className={styles.linkButton}>
                                About
                            </Button>
                        </Link>
                    </Grid>
                    <Grid md={4} className={styles.alignAndCenter} className={styles.alignAndCenter} >
                        <ThemeProvider theme={buttonTheme}>
                            <Grid container spacing={1}>
                                <Grid item md={5}>
                                    <Box >
                                        <Link to="/createprofile" className={styles.link}>
                                            <Button variant="contained" color="primary" className={styles.btn}>
                                                Create Profile
                                            </Button>
                                        </Link>
                                    </Box>
                                </Grid>
                                <Grid item md={5}>
                                    <Box>
                                        <Link to="/signin" className={styles.link}>
                                            <Button variant="contained" color="primary" className={styles.btn}>
                                                Sign In
                                            </ Button>
                                        </Link>
                                    </Box>
                                </Grid>
                            </Grid>
                        </ThemeProvider>
                    </Grid>
                </Grid >
            </Toolbar>
        </AppBar >
    )

}
export default Navbar;