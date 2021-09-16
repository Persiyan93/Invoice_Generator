import React from 'react'
import { Route, Redirect } from 'react-router-dom'


export default function PrivateRoutes(props) {
    const { user } = props

    return (
        <Route
            {...props.rest}
            render={(user) =>
                (user.isAuthenticated && user.accessAreas.find(a => a.emailAccess))
                && <props.component {...props} />
                // : <Redirect to={{ pathname: '/Identity/Login', state: { from: props.location } }} />

            }
        />
    )
}