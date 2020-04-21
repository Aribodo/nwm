import React from 'react';
import {Modal, ModalBody, Table, ModalHeader} from 'reactstrap';
import actions from './actions'
import {connect} from 'react-redux';

const style = {fontSize:"14px", color: "grey"}
const style2 = {fontSize:"14px", color: "grey", borderTop: "none"}
class Stock extends React.Component {
  state = {}
  // toggles profile modal
  toggleModal(){
    this.setState({modalOpen: !this.state.modalOpen})
  }
  // fetches profile of stock
  fetchProfile(){
    const {exchange} = this.props
    actions.fetchProfile(exchange.symbol)
    this.toggleModal()
  }

  render() {
    const {exchange, profile} = this.props;
    const {modalOpen} = this.state;
    return <>
    <tr className="exchangeRow" onClick={this.fetchProfile.bind(this)}>
      <td style={style}>
        {exchange.description}
      </td>
      <td style={style}>
        {exchange.displaySymbol}
      </td>
    </tr>
    <Modal isOpen={modalOpen} toggle={this.toggleModal.bind(this)}>
    <ModalHeader toggle={this.toggleModal.bind(this)} style={{color: "#537f9a"}}>{profile && profile.companyName}</ModalHeader>
      { profile ?
        <ModalBody style={{paddingRight:20, paddingLeft:20}}>
          <Table>
          <tr>
            <td style={style2}>Exchange</td>
            <td style={style2}>{profile.exchange || "N/A"}</td>
          </tr>
          <tr>
            <td style={style}>Industry</td>
            <td style={style}>{profile.industry  || "N/A"}</td>
          </tr>
          <tr>
            <td style={style} >CEO</td>
            <td style={style} >{profile.ceo  || "N/A"}</td>
          </tr>
          <tr>
            <td style={style} >Website</td>
            <td style={style} >{profile.website || "N/A"}</td>
          </tr>
          </Table>
          <br/>
          <h6 className="w-100" style={{textAlign: "center", color: "#537f9a"}}>Bio</h6>
          <p align="center">
            {profile.description}
          </p>
        </ModalBody>
        :
        <ModalBody>
         No data can be found at this time
        </ModalBody>
      }
    </Modal>
    </>
  }
}

export default connect(({profile}) => {
  return {profile}
})(Stock);
