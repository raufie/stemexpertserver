import React, { Component, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar, Box, Toolbar,
    Typography, Grid, Paper,
    Button, makeStyles, createTheme, ThemeProvider, Container, TextField,
    InputAdornment, MenuItem, Menu
} from '@material-ui/core';
import { CircularProgress, IconButton } from '@material-ui/core';
import { Search, AccountCircle, CloudUpload as UploadIcon } from '@material-ui/icons';
import { basicStyles } from '../../Styles/allstyles';
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
const useBasicStyles = makeStyles(basicStyles)
const ExpertNavbar = (props) => {
    const navigateTo = useNavigate();
    // 
    const styles = useStyles()
    const basicStyles = useBasicStyles()
    // 
    const [searchText, setSearchText] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const [isMenuOpen, setMenuOpen] = useState(false)
    const menuId = 'primary-search-account-menu';

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchText.length != 0) {
            navigateTo(`/videos/1/?q=${searchText}`)
        }
    }

    const handleSearchText = (e) => {
        setSearchText(e.target.value)
    }
    const handleMenuOpen = (e) => {
        //set the anchor element to the button that was clicked
        setAnchorEl(e.currentTarget)
        setMenuOpen(true)
    }
    const handleMenuClose = (e) => {

        setMenuOpen(false)
    }
    const navigateToProfile = (e) => {
        setMenuOpen(false)
        navigateTo("/profile")
    }
    const logOut = (e) => {
        localStorage.clear("token")
        setMenuOpen(false)
        navigateTo("/")
        window.location.reload()
    }
    const menu = (<Menu anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        onClose={handleMenuClose}
    >
        <MenuItem name="profile" onClick={navigateToProfile}>Profile</MenuItem>
        <MenuItem name="logout" onClick={logOut} >Log Out</MenuItem>

    </Menu>)


    return (
        <Box>
            <AppBar className={styles.root} color="primary" className={styles.appbar}>
                <Toolbar>
                    <Grid container  >
                        <Grid md={5} className={styles.alignAndCenter} >
                            <Link to="/" className={styles.link}>
                                <Button variant="outlined" className={styles.buttonMargin} className={styles.linkButton}>
                                    Home
                                </Button>
                            </Link>
                            <Link to="/videos" className={styles.link}>
                                <Button variant="outlined" className={styles.linkButton}>
                                    My Videos
                                </Button>
                            </Link>

                        </Grid>
                        <Grid md={2} className={styles.alignAndCenter}>
                            <Box >
                                <Link to="/" className={styles.link}>
                                    <Typography variant="h5" component="p">StemExpert</Typography>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid md={5} className={styles.alignAndCenter} className={styles.alignAndCenter} >

                            <Grid container spacing={1}>
                                <Grid item md={7}>
                                    <Box mt={1}>
                                        <Link to="/upload" className={styles.link}>
                                            <Button color="secondary" variant="contained" endIcon={<UploadIcon />} >Upload</Button>
                                        </Link>
                                    </Box>
                                </Grid>

                                <Grid item md={3}>
                                    <MenuItem onClick={handleMenuOpen}>
                                        <Button aria-controls={menuId}>
                                            <AccountCircle style={{ fontSize: 23, fill: "white", color: "white" }} />
                                        </Button>
                                    </MenuItem>
                                    {isMenuOpen ? menu : null}

                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid >
                </Toolbar>
            </AppBar >

        </Box>
    )

}
export default ExpertNavbar;