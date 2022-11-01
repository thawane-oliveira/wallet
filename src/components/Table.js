import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { excludeExpense } from '../redux/actions';

// consultado sobre table, thead e tbody no w3schools: https://www.w3schools.com/tags/tag_thead.asp
class Table extends Component {
  rmvXp = ({ target }) => {
    const { dispatch } = this.props;

    // const filterXp = expenses.filter((x) => x.id !== evt.id);
    // console.log(filterXp); o filtro por aqui estava removendo somente o id do objeto, resultando em dois objetos acabarem recebendo id 0. Mudei o filter para o reducer da wallet e deu certo

    dispatch(excludeExpense(target.id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <>
        <div>Table</div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={ item.id }>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>{Number(item.value).toFixed(2)}</td>
                <td>{item.exchangeRates[item.currency].name}</td>
                <td>
                  {Number(item.value * item.exchangeRates[item.currency].ask)
                    .toFixed(2)}
                </td>
                <td>
                  {Number(item.exchangeRates[item.currency].ask).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.rmvXp }
                    id={ item.id }
                    // value={item.id}tinha colocado value antes, mas não batia com o id
                  >
                    x
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
