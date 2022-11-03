import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { coinArray, finishEditExpense, quotationAndInfo } from '../redux/actions';
import '../styles/WalletForm.css';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  resetState = {
    value: '', description: '', currency: 'USD', method: 'Dinheiro', tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(coinArray());
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

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
      ...this.resetState, id: prevState.id + 1, exchangeRates,
    }));
  };

  saveEdit = () => {
    const { expenses, id, dispatch } = this.props;
    const rateOfDay = expenses.find((item) => item.id === id).exchangeRates;
    dispatch(finishEditExpense({ ...this.state, id, exchangeRates: rateOfDay }));
    this.setState({ ...this.resetState });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <fieldset className="wFormContainer">
        <label
          htmlFor="valueInput"
          className="valueLabel"
        >
          Valor da despesa
          <input
            className="valueInput"
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
          className="descLabel"
        >
          Descrição da despesa
          <input
            className="descInput"
            type="text"
            data-testid="description-input"
            id="descInput"
            name="description"
            value={ description }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="currency" className="currLabel">
          Moeda
          <select
            className="currInput"
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
          className="payLabel"
        >
          Método de pagamento
          <select
            className="payInput"
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
          className="tagLabel"
        >
          Categoria
          <select
            className="tagInput"
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
        { editor ? (
          <button
            className="finishEdit"
            type="button"
            onClick={ this.saveEdit }
            data-testid="edit-btn2"
          >
            Editar despesa

          </button>
        )
          : (
            <button
              className="saveButton"
              type="button"
              onClick={ this.addExpense }
            >
              Adicionar despesa
            </button>
          )}
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  id: state.wallet.id,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
