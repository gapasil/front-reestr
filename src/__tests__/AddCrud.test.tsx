import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddCrud } from '../components/containers/addCrud/addCrud'; // Assuming AddCrud is in the same directory
import { createCrud } from '@/services/crudServices';
import { useCheckToken } from '@/hooks/userHooks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock the necessary imports
jest.mock('../services/crudServices');
jest.mock('../hooks/userHooks');
jest.mock('../store/UISlices/infModalSlice', () => ({
  showInfModal: jest.fn(),
}));

const mockStore = configureStore();

const store = mockStore({});

describe('AddCrud Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all input fields correctly', () => {
    render(
      <Provider store={store}>
        <AddCrud />
      </Provider>,
    );

    expect(screen.getByLabelText(/Имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Возраст/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пол/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Дата рождения/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Место рождения/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Гражданство/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Телефон/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Адрес/i)).toBeInTheDocument();
    expect(screen.getByText(/Социальные медиа:/i)).toBeInTheDocument();
    expect(screen.getByText(/Категории:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Ссылки подтвержающие описание:/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Описание/i)).toBeInTheDocument();
  });

  test('handles form submission with valid data', async () => {
    (createCrud as jest.Mock).mockResolvedValueOnce({ message: 'Success' });
    (useCheckToken as jest.Mock).mockReturnValue(false);

    render(
      <Provider store={store}>
        <AddCrud />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText(/Имя/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Возраст/i), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getByLabelText(/Пол/i), {
      target: { value: 'Мужчина' },
    });
    fireEvent.change(screen.getByLabelText(/Дата рождения/i), {
      target: { value: '1990-01-01' },
    });
    fireEvent.change(screen.getByLabelText(/Место рождения/i), {
      target: { value: 'City' },
    });
    fireEvent.change(screen.getByLabelText(/Гражданство/i), {
      target: { value: 'Country' },
    });
    fireEvent.change(screen.getByLabelText(/Телефон/i), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Адрес/i), {
      target: { value: '123 Street' },
    });

    fireEvent.submit(screen.getByText(/Сохранить/i));
  });

  test('displays errors when submitting invalid data', async () => {
    (useCheckToken as jest.Mock).mockReturnValue(false);

    render(
      <Provider store={store}>
        <AddCrud />
      </Provider>,
    );

    fireEvent.submit(screen.getByText(/Сохранить/i));

    await waitFor(() => {
      // Check for specific error messages
      expect(screen.getByText(/Введите имя/i)).toBeInTheDocument();
      expect(screen.getByText(/Введите возраст/i)).toBeInTheDocument();
      expect(screen.getByText(/Некорректная дата/i)).toBeInTheDocument();
      expect(screen.getByText(/Введите место рождения/i)).toBeInTheDocument();
      expect(screen.getByText(/Введите гражданство/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Некорректный номер телефона/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Некорректный email/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Минимум символов описания 50/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Выберите категорию/i)).toBeInTheDocument();
    });
  });

  test('displays authorization error when user is not authenticated', () => {
    (useCheckToken as jest.Mock).mockReturnValue(true);

    render(
      <Provider store={store}>
        <AddCrud />
      </Provider>,
    );

    expect(screen.getByText(/Необходимо авторизоваться/i)).toBeInTheDocument();
  });
});
