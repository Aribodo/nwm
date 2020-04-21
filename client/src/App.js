

//This component contains the entire apps views and controlls the flow through them
import React from 'react';
import {connect} from 'react-redux';
import { Container, Row, Col, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import './App.css';
import Pagination from './helpers/pagination'
import Exchange from './exchange'
import Select from 'react-select';
import actions from './actions';

class App extends React.Component {
  state = {};
  // headers for list
  headers = {columns: [
      {label: 'Name'},
      {label: 'Symbol'},
    ]};
  // fetches exchange based on exchnge code passed in
  fetchExchange(exchange){
    actions.fetchExchange(exchange.value)
    this.setState({exchangeName: exchange.label})
  }
  //sets states filtervalue
  filterValue(e){
    this.setState({filterVal: e.target.value});
  }
  //sets up search field for list
  _filters() {
    const {filterVal} = this.state;
    return <Input value={filterVal} onChange={this.filterValue.bind(this)}/>
  }
  //filters collection from props
  filtered() {
    const {filterVal} = this.state;
    const {exchange} = this.props;
    const regex = new RegExp(filterVal, 'i');
    return exchange.filter(e => {
        return (e.description.match(regex) || e.symbol.match(regex)) ;
    });
  }

  render() {
    const {exchanges, exchange} = this.props;
    const {exchangeName} = this.state;
    const exchangeOptions = exchanges.map((exchanges) => {
      return {value:exchanges.code , label: exchanges.name}
    })
    return <div className="App p-5">
      {exchange ?
        <div id="exchange">
        <Card>
        <Pagination
        title={`${exchangeName} Exchange`}
        collection={this.filtered()}
        component={Exchange}
        filters={this._filters()}
        headers={this.headers}
        field="exchange"
        hover={true}
        />
        </Card>
        </div>
      :
        <Col className="d-flex align-items-center h-100">
        <Row className="d-flex flex-fill justify-content-center">
        <div id="content">
          <Row className="d-flex flex-fill justify-content-center">
          <img src={ require('./images/nwm.jpeg') } height="150" width="150"/>
          </Row>
          <h6 className="w-100 selectTitle" >Northwestern Mutual</h6>
          <h6 className="w-100 selectTitle" >Exchange Listing</h6>
          <Select id= "exchangeSelect" name= "exchanges" placeholder="select an exchange"
          isSearchable options={exchangeOptions} onChange={this.fetchExchange.bind(this)}/>
        </div>
        </Row>
        </Col>
      }
    </div>
  }
}

export default connect(({exchanges, exchange}) => {
  return {exchanges, exchange}
})(App);
