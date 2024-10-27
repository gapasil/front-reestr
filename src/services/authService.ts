import axios from 'axios';

export interface DecodedToken {
  role: string;
  id: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${API}api/auth/checktoken`, { token });
    return response.status === 200; // Если статус 200, то токен валиден
  } catch (error) {
    console.error('Ошибка при проверке токена:', error);
    return false; // Если произошла ошибка, токен недействителен
  }
};

export const isAdmin = async (): Promise<boolean> => {
  const token = localStorage.getItem('user'); // Получаем токен из localStorage
  if (!token) return false; // Если токен не найден, возвращаем false

  try {
    await axios(`${API}api/cruds/inactive?limit=1`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)?.token}`,
      },
    });
    return true;
  } catch (e) {
    console.error('Произошла ошибка', e);
    return false;
  }
};
