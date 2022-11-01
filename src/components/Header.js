import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      <>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          { total.toFixed(2) }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </>
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
