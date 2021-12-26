import React, { Component } from 'react';
import { makeStyles, AppBar, Typography, Container, Box } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { basicStyles } from '../../Styles/allstyles'
import { GitHub } from '@material-ui/icons';
const useStyles = makeStyles(basicStyles);
const Footer = () => {
    const styles = useStyles();
    return (
        //create a footer using appbar
        <AppBar position="static" color="primary" className={styles.footer}>
            <Container >
                <Box pt={2}>

                    <Typography variant="h6" color="inherit" >
                        <a href="https://github.com/raufie" target="_blank" className={styles.linkStyle}>Github<GitHub />
                        </a>
                    </Typography>

                    <Typography variant="h6" color="inherit"> Copyright &copy; 2021 StemExpert</Typography>
                </Box>
            </Container>

        </AppBar >

    )
}

export default Footer;