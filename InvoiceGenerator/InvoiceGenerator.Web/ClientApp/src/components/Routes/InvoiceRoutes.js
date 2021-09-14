import React from 'react'
import { Route, Redirect } from 'react-router-dom'


export default function PrivateRoutes({ component: Component, user, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                (user.isAuthenticated && user.permissions.invoiceAccess)
                && <Component {...props} />
                // : <Redirect to={{ pathname: '/Identity/Login', state: { from: props.location } }} />

            }
        />
    )
}