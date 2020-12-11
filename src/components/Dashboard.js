import React, { Component } from 'react';
import '../stylescss/dash.css';
import Content from './Content';


class Dashboard extends Component {
    render() {
        return (
<div className="container-fluid px-4">

  <div className="row ml-lg-3 g-5 pt-3 mb-3">
    <div className="col">
      <Content />
    </div>
  </div>
</div>
        )
    }
}

export default Dashboard;