import Link from 'next/link'
import React from 'react'
import { Container, Menu } from 'semantic-ui-react'
import Header from './Header.component'
import 'semantic-ui-css/semantic.min.css'

function Layout({children}) {
    return (
        <Container>
            <Header/>
            {children}
        </Container>
    )
}

export default Layout
