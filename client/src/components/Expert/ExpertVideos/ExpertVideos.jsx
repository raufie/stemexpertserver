import React, { Component, useEffect, useState } from 'react';
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { Box, Paper, Container, Typography, makeStyles, Grid, CircularProgress, Button } from '@material-ui/core';
import VideoCard from '../../Shared/VideoCard/VideoCard';
import { basicStyles } from '../../Styles/allstyles';
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import _ from 'lodash';
import axiosInstance from '../../../services/axiosInstance';
const useStyles = makeStyles(basicStyles);
const ExpertVideos = (props) => {
    const styles = useStyles();
    //
    const params = useParams();
    const navigateTo = useNavigate();
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(10);
    //search
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const currentPage = params.page || 1;
        axiosInstance.get(`/experts/videos/${currentPage}`).then(res => {
            setPageCount(res.data.pageCount)
            setVideos(res.data.videos)
        }).catch(e => {
            alert("error loading videos")
        })
        setCurrentPage(parseInt(params.page || 1))
        //do the axios call and change (page, pageCount right at the start) when u write server side
    }, [currentPage])

    const ResultsJSX = () => (
        <Box mx={1} my={1}>
            <Paper elevation={3} >
                <Grid container >

                    {videos.map(video => {
                        return (
                            <Grid item md={3}> <VideoCard info={video} /></Grid>
                        )
                    })}
                </Grid>
            </Paper>
        </Box>
    )
    const setPage = (page) => {
        setCurrentPage(page);
        navigateTo(`/videos/${page}`)

    }

    const Pagination = () => {
        return (
            <Box my={5} mx={10} className={styles.centerBox}>
                {currentPage > 1 ?
                    <Button onClick={() => { setPage(currentPage - 1) }}>
                        <ArrowLeft style={{ fontSize: 50 }} />
                    </Button>
                    : <Button disabled >
                        <ArrowLeft style={{ fontSize: 50, fill: "grey" }} disabled />
                    </Button>}
                {
                    _.range(1, pageCount + 1).map(i => {
                        return (
                            <Button onClick={() => { setPage(i) }} style={i == currentPage ? { border: "solid" } : {}}>
                                <Typography variant={'h6'} >{i}</Typography>
                            </Button>
                        )
                    })
                }
                {(parseInt(currentPage) < parseInt(pageCount)) ?
                    <Button onClick={() => { setPage(currentPage + 1) }}>
                        <ArrowRight style={{ fontSize: 50 }} />
                    </Button>
                    : <Button disabled >
                        <ArrowRight style={{ fontSize: 50, fill: "grey" }} disabled />
                    </Button>}
            </Box>

        )
    }
    return (
        <Box mt={10} mx={10}>
            <Paper elevation={3}>
                < Typography variant="h4" component="h2" className={styles.centerBox} >Your Videos</Typography>
            </Paper>
            <Box>
                <Paper my={5} mx={10} elevation={3}>
                    {videos == [] ? <Box className={styles.centerBox}> <CircularProgress /></Box> : <ResultsJSX />}
                    <Pagination />
                </Paper>

            </Box>

        </Box>

    )
}
export default ExpertVideos;