import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core'
const usePageStyle = makeStyles({
    page: { background: '#e5e5e5' },
    width: '100%'
})
const Layout = ({ children }) => {
    const styles = usePageStyle()
    return (
        <div>
            <div className={styles.page}>
                {children}
            </div>
        </div>
    )
}
export default Layout