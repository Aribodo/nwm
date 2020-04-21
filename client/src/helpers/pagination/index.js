import React from 'react';
import Table from './table';
import {Card, Pagination, PaginationItem, PaginationLink, Row, Col} from 'reactstrap';
class Pagination_ extends React.Component {
  state = {page: 1, perPage: 20, lowerLimit:0, upperLimit: 5};

  // set page and pagination based on current page
  setPage(page) {
      let {lowerLimit, upperLimit} = this.state;
      lowerLimit = page - 2;
      upperLimit = page + 2;
      if(lowerLimit <= 0){
         upperLimit -= (lowerLimit -1)
         lowerLimit = 0;
      }
      else{
          lowerLimit = page - 3;
      }
      this.setState({...this.state, page, upperLimit: upperLimit, lowerLimit: lowerLimit });
  }

  render() {
    const {perPage, page, lowerLimit, upperLimit} = this.state;
    const {title, component: Component, field, headers, filters, collection} = this.props;
    const startIndex = perPage * (page - 1);
    const toRender = collection.slice(startIndex, startIndex + perPage);
    const list = toRender.map((c, index) => {
      const props = {[field]: c};
      let componentKey = c.id
      return <Component key={componentKey} {...props} />;
    });
    const pages = [...Array(Math.ceil(collection.length / 20))];
    return <>
      <div className="card-header d-flex align-items-center justify-content-between" style={{backgroundColor: "white"}}>
          <div className="d-flex" style={{width:"100%"}}>
              <Col>
                  <Row>
                      <Pagination>
                          <PaginationItem disabled={page === 1}>
                              <PaginationLink previous onClick={this.setPage.bind(this, page - 1)}/>
                          </PaginationItem>
                          {pages.map((p, index) => ((index >= lowerLimit && index < upperLimit) &&
                              <PaginationItem key={index} >
                                  <Row>
                                      <Col>
                                          <PaginationLink onClick={this.setPage.bind(this, index + 1)} style={page === index + 1 ? {backgroundColor:"#537f9a", borderColor:"#537f9a", color:"white"}:{color:"#537f9a"}}>
                                              {index + 1}
                                          </PaginationLink>
                                      </Col>
                                  </Row>
                              </PaginationItem>
                          ))}
                          <PaginationItem disabled={page === pages.length}>
                              <PaginationLink next onClick={this.setPage.bind(this, page + 1)}/>
                          </PaginationItem>
                      </Pagination>
                  </Row>
              </Col>
              <Col>
              <div className="d-flex  justify-content-end" style={{flex: '0 70%'}}>
                  <div className="mr-3 b-0" style={{width:"80%"}}>
                      {filters}
                  </div>
              </div>
              </Col>
            <Col className="d-flex align-items-center">
              <div className="d-flex  justify-content-end" style={{width:"100%"}}>
                <h5 style={{color: '#537f9a', marginBottom:0}}>
                  {title}
                </h5>
              </div>
            </Col>
          </div>
      </div>
      <div className="card-body">
        <Table list={list} headers={headers} parent={this}/>
      </div>
      </>
  }
}

export default Pagination_;
