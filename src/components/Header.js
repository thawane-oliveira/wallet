import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    // Recuperando informações do estado Redux
    const total = expenses.length === 0 ? 0
      : expenses.reduce((acc, curr) => {
        const { value, currency, exchangeRates } = curr;
        const result = acc + (Number(value) * (Number(exchangeRates[currency].ask)));
        return result;
      }, 0);

    return (
      <div className="headerContainer">
        <p data-testid="email-field" className="loggedEmail">{ email }</p>
        <p data-testid="total-field" className="totalField">
          { total.toFixed(2) }
        </p>
        <p data-testid="header-currency-field" className="brl">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Header);
