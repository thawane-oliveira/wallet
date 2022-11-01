import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { coinArray } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(coinArray());
  }

  render() {
    const { currency } = this.props;
    // { console.log(currencies); }

    return (
      <>
        <p>WalletForm</p>
        <fieldset>
          <label
            htmlFor="valueInput"
          >
            Valor da despesa
            <input
              type="number"
              data-testid="value-input"
              id="valueInput"
            />
          </label>
          <label
            htmlFor="descInput"
          >
            Descrição da despesa
            <input
              type="text"
              data-testid="description-input"
              id="descInput"
            />
          </label>
          <label
            htmlFor="currency"
          >
            Moeda
            <select
              data-testid="currency-input"
              id="currency"
            >
              {currency.map((c) => <option key={ c } value={ c }>{c}</option>)}
            </select>
          </label>
          <label
            htmlFor="payment"
          >
            Método de pagamento
            <select
              data-testid="method-input"
              id="payment"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
          </label>
          <label
            htmlFor="tag"
          >
            Método de pagamento
            <select
              data-testid="tag-input"
              id="tag"
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
        </fieldset>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currency: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
