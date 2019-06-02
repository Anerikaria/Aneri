import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const NavBar = ({ history }) => {
    const currentLocation = history.location.pathname

    const navigatePage = page => history.push(page)

    return (
        <Segment inverted>
            <Menu inverted pointing secondary>
                <Menu.Item header onClick={() => navigatePage('/Product')}>
                    React
        </Menu.Item>
                <Menu.Item
                    name="Products"
                    active={currentLocation === '/Product'}
                    onClick={() => navigatePage('/Product')}
                />
                <Menu.Item
                    name="Customers"
                    active={currentLocation === '/Customer'}
                    onClick={() => navigatePage('/Customer')}
                />

                <Menu.Item
                    name="Stores"
                    active={currentLocation === '/Store'}
                    onClick={() => navigatePage('/Store')}
                />
                < Menu.Item
                    name="Sales"
                    active={currentLocation === '/Sales'}
                    onClick={() => navigatePage('/Sales')}
                />
            </Menu>
        </Segment>
    )
}

export default withRouter(NavBar)
