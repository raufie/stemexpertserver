import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from './services/axiosInstance'
import { apiUrl } from './components/config/config'
import './App.css';
import { Container, createTheme, ThemeProvider, Box, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
// anon components
import Navbar from './components/Anon/Navbar/Navbar'
import Footer from './components/Shared/Footer/Footer'
import Home from './components/Anon/Home/Home'
import CreateProfile from './components/Anon/CreateProfile/CreateProfile'
import SignIn from './components/Anon/SignIn/SignIn';
import Apply from './components/Anon/Apply/Apply'
// shared components
import About from './components/Anon/About/About'
import Layout from './components/Shared/Layout/Layout'
import NotFound from './components/Shared/NotFound/NotFound'
// user components
import UserNavbar from './components/User/UserNavbar/UserNavbar'
import UserHome from './components/User/UserHome/UserHome'
import Video from './components/Shared/Video/Video'
import Videos from './components/Shared/Videos/Videos'
import ExpertProfile from './components/User/ExpertProfile/ExpertProfile';
import Profile from './components/User/Profile/Profile';
// expert user components

import ExpertNavbar from './components/Expert/ExpertNavbar/ExpertNavbar';
import ExpertHome from './components/Expert/ExpertHome/ExpertHome';
import ExpertVideos from './components/Expert/ExpertVideos/ExpertVideos';
import ExpertVideo from './components/Expert/ExpertVideo/ExpertVideo'
import ExpertUserProfile from './components/Expert/ExpertUserProfile/ExpertUserProfile'
import ExpertUpload from './components/Expert/ExpertUpload/ExpertUpload'


const theme = createTheme({
  palette: {
    primary: {
      main: '#581845',
    },
    secondary: { main: '#F2EB7E' },

  },
})
const App = () => {

  const [user, setUser] = useState({ type: "none" });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)

    axiosInstance.get(`/users/`).then(res => {
      setUser(res.data)
      setLoading(false)
    }).catch(e => {
      axiosInstance.get(`/experts/`).then(res => {

        setLoading(false)

        setUser(res.data)
      }).catch(e => {
        setLoading(false)
      })

    })
  }, [])
  if (isLoading) {
    return <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
      <Typography variant="h1">Loading</Typography>
      <CircularProgress size={100} />
    </Box>
  }
  if (user && user.type == "user") {
    return (
      <ThemeProvider theme={theme} >
        <Router>
          <Layout>
            <UserNavbar user={user} />
            <Routes>
              <Route path="/" element={<UserHome />} />
              <Route path="/video/:id" element={<Video />} />
              <Route path="/videos/:page" element={<Videos />} />
              <Route path="/videos/" element={<Videos />} />
              <Route path="/expert/:id" element={<ExpertProfile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Layout>
        </Router>
      </ThemeProvider>

    )
  } else if (user && user.type == "expert") {
    return (
      <ThemeProvider theme={theme} >
        <Router>
          <Layout>
            <ExpertNavbar />
            <Routes>
              <Route path="/" element={<ExpertHome />} />
              <Route path="/videos/:page" element={<ExpertVideos />} />
              <Route path="/videos/" element={<ExpertVideos />} />
              <Route path="/profile/" element={<ExpertUserProfile />} />
              <Route path="/video/:id" element={<ExpertVideo />} />
              <Route path="/upload" element={<ExpertUpload />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
            <Footer />

          </Layout>
        </Router>
      </ThemeProvider>
    )
  } else {
    return (
      <ThemeProvider theme={theme} >
        <Router>
          <Layout>
            <Navbar title="bruh" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/createprofile" element={<CreateProfile />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
            <Footer />
          </Layout>
        </Router>
      </ThemeProvider>

    )
  }


}
export default App;
