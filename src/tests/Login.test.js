import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Componente Login', () => {
  // renderWithRouterAndRedux(<App />);
  // const emailInput = screen.getByTestId('email-input');
  // const passwordInput = screen.getByTestId('password-input');

  it('Verifica se é possível preencher os inputs', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'kakyoin@hierophant.green');
    userEvent.type(passwordInput, 'emeraldsplash');
  });

  it('Verifica se o botão fica desativado se um dos campos estiver vazio/inválido', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'gappy@soft.wet');
    expect(button).toBeDisabled();

    userEvent.type(passwordInput, '123');
    expect(button).toBeDisabled();
  });

  it('Verifica se o botão é ativado após preencher os campos', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'jolyne@stone.ocean');
    userEvent.type(passwordInput, 'oraora');
    expect(button).toBeEnabled();

    userEvent.click(button);
  });

  it('Verifica se após clicar no botão é feito o redirecionamento para a path /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'pikachu@raichu.pk');
    userEvent.type(passwordInput, 'thunderwav3');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
