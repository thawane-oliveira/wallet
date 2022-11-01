import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { submitInfo } from '../redux/actions';

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
    // regex extraído do tópico no link: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript do Stackoverflow
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
        <div>Login</div>
        <fieldset>
          <label htmlFor="emailInput">
            E-mail
            <input
              data-testid="email-input"
              type="email"
              id="emailInput"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
              required
            />
          </label>

          <label htmlFor="passInput">
            Senha
            <input
              data-testid="password-input"
              type="password"
              id="passInput"
              name="password"
              value={ password }
              onChange={ this.onInputChange }
              required
            />
          </label>

          <button
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
