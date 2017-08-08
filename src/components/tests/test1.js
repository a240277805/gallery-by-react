/**
 * Created by zmk on 2017/8/7.
 */
import React from 'react'
import ReactDOM from 'react-dom'

import {Link,IndexRoute} from 'react-router'
import {  Route, Switch } from 'react-router-dom';
import App from '../Main';
import About from './About.js';

function　isEnter(nextState, replaceState){
  console.log("enter isEnter");
  debugger;
  replaceState("/app");
}

const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
})

const Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})

const Dashboard = React.createClass({
  render() {
    return <div>Welcome to the app!</div>
  }
})
const RouteConfig=(
 <div>
   <About>
       <Route path="/app" component={App}/>
       <Route path="/inbox" component={Inbox}/>
       <Route path="/messages/:id" component={Message} />
       {/*<IndexRoute component={Dashboard} />*/}
   </About>


   </div>
);

export default RouteConfig
