import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import EmailForm from './EmailForm'

class Router extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/create' component={EmailForm} />
            <Route path='/edit/:id' component={EmailForm} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

if (document.getElementById('email-form')) {
  ReactDOM.render(<Router />, document.getElementById('email-form'))
}
