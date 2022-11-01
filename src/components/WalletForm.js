import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { coinArray, quotationAndInfo } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(coinArray());
    // delete data.USDT;
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // quotationCurrency = async () => {
  //   // const { dispatch } = this.props;
  //   const apiResponse = coinArray();
  //   delete apiResponse.USDT;
  //   this.setState({
  //     exchangeRates: apiResponse,
  //   }, this.addExpense);
  // };

  currApiRequest = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');

    const data = await response.json();

    delete data.USDT;

    return data;
  };

  addExpense = async () => {
    const { dispatch } = this.props;
    const exchangeRates = await this.currApiRequest();

    const item = { ...this.state, exchangeRates };

    dispatch(quotationAndInfo(item));

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates,
    }));

    // this.setState({
    //   value: '',
    //   description: '',
    //   currency: 'USD',
    //   method: 'Dinheiro',
    //   tag: 'Alimentação',
    // });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
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
              name="value"
              value={ value }
              onChange={ this.onInputChange }
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
              name="description"
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>
          <label
            htmlFor="currency"
          >
            Moeda
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.onInputChange }
            >
              {currencies.map((c) => <option key={ c } value={ c }>{c}</option>)}
            </select>
          </label>
          <label
            htmlFor="payment"
          >
            Método de pagamento
            <select
              data-testid="method-input"
              id="payment"
              name="method"
              value={ method }
              onChange={ this.onInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label
            htmlFor="tag"
          >
            Categoria
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.onInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button type="button" onClick={ this.addExpense }>
            Adicionar despesa
          </button>
        </fieldset>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
