import React from 'react';

class Header extends React.Component {
  render() {
    const {label} = this.props;
    return <th style={{ borderTopWidth:"0px", borderBottomWidth:"1px", fontSize:"12px", color:"#a7adb5"}}>
      {label}
    </th>;
  }
}

export default Header;
