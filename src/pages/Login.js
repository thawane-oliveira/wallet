import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { submitInfo } from '../redux/actions';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.enableSubmitButton);
  };

  enableSubmitButton = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const condition = /^\S+@\S+\.\S+$/;

    if (password.length >= minLength && email.match(condition)) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  submitUserInfo = () => {
    const { dispatch, history } = this.props;
    dispatch(submitInfo(this.state));
    // enviando o estado do componente para o estado global, conseguindo salvá-lo
    history.push('/carteira');
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <>
        <h1 className="loginTitle">Your Wallet</h1>
        <fieldset className="loginFieldset">
          <label htmlFor="emailInput" className="emailLabel">
            E-mail
            <input
              className="emailInput"
              data-testid="email-input"
              type="email"
              id="emailInput"
              name="email"
              value={ email }
              placeholder="Digite seu e-mail"
              onChange={ this.onInputChange }
              required
            />
          </label>

          <label htmlFor="passInput" className="passLabel">
            Senha
            <input
              className="passInput"
              data-testid="password-input"
              type="password"
              id="passInput"
              name="password"
              placeholder="Digite sua senha"
              value={ password }
              onChange={ this.onInputChange }
              required
            />
          </label>

          <button
            className="enterButton"
            type="submit"
            disabled={ isButtonDisabled }
            onClick={ this.submitUserInfo }
          >
            Entrar
          </button>
        </fieldset>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
