import React, { Component, useEffect, useState } from 'react';
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { Box, Paper, Container, Typography, makeStyles, Grid, CircularProgress, Button } from '@material-ui/core';
import VideoCard from '../VideoCard/VideoCard';
import { basicStyles } from '../../Styles/allstyles';
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import _ from 'lodash';
import axiosInstance from '../../../services/axiosInstance';

const useStyles = makeStyles(basicStyles);
const Videos = (props) => {
    const styles = useStyles();
    //
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();
    const navigateTo = useNavigate();
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(10);
    //search
    const [isForSearch, setIsForSearch] = React.useState(false);
    const [loadingSearchResults, setLoadingSearchResults] = useState(false)
    const [videos, setVideos] = useState([])
    const [message, setMessage] = useState("")

    const hasAQuery = () => {

        if (searchParams.get('q') && searchParams.get('q') != " ") {
            setIsForSearch(true);
        } else {
            setIsForSearch(false);
        }
    }
    useEffect(() => {
        hasAQuery();
        setCurrentPage(parseInt(params.page || 1))

        if (isForSearch) {

            axiosInstance.get(`/videos/search/${searchParams.get('q')}/${currentPage}/`).then(res => {
                setPageCount(res.data.pagecount)
                setVideos(res.data.videos)
                console.log(res.data)
            }).catch(e => {
                console.log(e)
            })
        } else {
            axiosInstance.get(`/videos/videos/${currentPage}/`).then(res => {
                setPageCount(res.data.pageCount)
                setVideos(res.data.videos)
            }).catch(e => {
                alert("error loading videos")
            })
        }
        //parse int

        //do the axios call and change (page, pageCount right at the start) when u write server side
    }, [searchParams, currentPage])

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
        if (isForSearch) {
            navigateTo(`/videos/${page}/?q=${searchParams.get("q")}`)
        } else {
            navigateTo(`/videos/${page}`)
        }
    }
    const SearchTitleJSX = () => (<Typography variant="h4" component="h2" className={styles.centerBox}>Search Results for '{searchParams.get("q")}'</Typography>)
    const VideosTitleJSX = () => (< Typography variant="h4" component="h2" className={styles.centerBox} > Videos</Typography>)
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
                {isForSearch ? <SearchTitleJSX /> : <VideosTitleJSX />}
            </Paper>
            <Box>
                <Paper my={5} mx={10} elevation={3}>
                    {loadingSearchResults ? <Box className={styles.centerBox}> <CircularProgress /></Box> : <ResultsJSX />}
                    <Pagination />
                </Paper>

            </Box>

        </Box>

    )
}
export default Videos;