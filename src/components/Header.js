import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { sendInfo } = this.props;
    const { email } = sendInfo;
    // Recuperando informações do estado Redux
    return (
      <>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field"> 0 </p>
        <p data-testid="header-currency-field">BRL</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  sendInfo: {
    ...state.user,
  } }
);

Header.propTypes = {
  sendInfo: PropTypes.shape({ email: PropTypes.string.isRequired }).isRequired,
};

export default connect(mapStateToProps)(Header);
