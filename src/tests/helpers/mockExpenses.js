import mockData from './mockData';

const exchange = mockData;

const currency = [
  'USD',
  'CAD',
  'GBP',
  'ARS',
  'BTC',
  'LTC',
  'EUR',
  'JPY',
  'CHF',
  'AUD',
  'CNY',
  'ILS',
  'ETH',
  'XRP',
  'DOGE',
];

const mockExpenses = {
  user: {
    email: 'kakyoin@hierophant.green',
  },
  wallet: {
    currencies: currency,
    expenses: [
      {
        id: 0,
        value: '525',
        description: 'Vinegar Doppio',
        currency: 'CAD',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: exchange,
      },
      {
        id: 1,
        value: '749',
        description: 'Purple Haze',
        currency: 'USD',
        method: 'Cartão de débito',
        tag: 'Saúde',
        exchangeRates: exchange,
      },
      {
        id: 2,
        value: '864',
        description: 'Golden Experience Requiem',
        currency: 'JPY',
        method: 'Cartão de crédito',
        tag: 'Transporte',
        exchangeRates: exchange,
      },
    ],
    editor: false,
    idToEdit: 0,
    id: 0,
  },
};

export default mockExpenses;
