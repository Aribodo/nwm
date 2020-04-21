import React from 'react';
import {Modal, ModalBody, Table} from 'reactstrap';
import actions from './actions'
import {connect} from 'react-redux';

const style = {fontSize:"14px", color: "grey"}
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
      { profile ?
        <ModalBody>
          <Table>
          <tr>
            <td>Name</td>
            <td>{profile.companyName}</td>
          </tr>
          <tr>
            <td>Exchange</td>
            <td>{profile.exchange}</td>
          </tr>
          <tr>
            <td>Industry</td>
            <td>{profile.industry}</td>
          </tr>
          <tr>
            <td>CEO</td>
            <td>{profile.ceo}</td>
          </tr>
          <tr>
            <td>Website</td>
            <td>{profile.website}</td>
          </tr>
          </Table>
          <br/>
          <p>
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
