import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Componente Wallet', () => {
  it('Verifica se aparece no header o e-mail utilizado no login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'kakyoin@hierophant.green');
    userEvent.type(passwordInput, 'emeraldsplash');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');

    const logEmail = screen.getByTestId('email-field');
    expect(logEmail).toBeVisible();
    expect(logEmail).toHaveTextContent('kakyoin@hierophant.green');
  });

  it('Verifica se há um fieldset para inserir dados de uma despesa e se é possível clicar no botão', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/carteira'));

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '49,50');
    userEvent.type(description, 'Dirty Deeds Done Dirt Cheap');
    await waitFor(() => {
      userEvent.selectOptions(screen.getByTestId('currency-input'), 'JPY');
    }); // Vitu me ajudou em 01/11 com a questão da assincronicidade
    userEvent.selectOptions(screen.getByTestId('method-input'), 'Cartão de débito');
    userEvent.selectOptions(screen.getByTestId('tag-input'), 'Lazer');
    expect(addExpenseButton).toBeVisible();
  });

  it('Verifica se após adicionar uma despesa a tabela de gastos se torna visível', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/carteira'));

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });
    const table = screen.getByRole('table');

    userEvent.type(value, '14,70');
    userEvent.type(description, 'Hermit Purple');
    userEvent.selectOptions(screen.getByTestId('method-input'), 'Cartão de crédito');
    userEvent.selectOptions(screen.getByTestId('tag-input'), 'Transporte');

    userEvent.click(addExpenseButton);
    expect(table).toBeVisible();
  });

  it('Verifica se após adicionada, uma despesa é passível de remoção na tabela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/carteira'));

    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });
    const table = screen.getByRole('table');

    userEvent.click(addExpenseButton);
    expect(table).toBeVisible();

    await waitFor(() => {
      const removeButton = screen.getByTestId('delete-btn');
      userEvent.click(removeButton);
    });
  });
});
