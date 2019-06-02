
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'



import Product from '../JSXfiles/Product.jsx'
import Customer from '../JSXfiles/Customer.jsx'
import Store from '../JSXfiles/Store.jsx'
import Sales from '../JSXfiles/Sales.jsx'
import MEnuNav from '../JSXfiles/MEnuNav.jsx'


const GlobalStyle = createGlobalStyle`
  body, html {
    padding: 0;
    margin: 0;
  }
  *, *:before, *:after {
    padding: 0;
    margin: 0;
  }
.ui.form .field{
 max-width:75%;
}
`

const App = () => {


    return (
        <div>
            <GlobalStyle />
            <MEnuNav/>
            <Switch>

                <Route path="/Product" component={Product} />
                <Route path="/Customer" component={Customer} />
                <Route path="/Store" component={Store} />
                <Route path="/Sales" component={Sales} />
                <Route path="/MEnuNav" component={MEnuNav} />

                < Redirect to="/Product" />
            </Switch>
        </div>
    )
}

export default App

