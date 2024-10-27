import { isAdmin, verifyToken } from '@/services/authService';
import { useAppDispatch } from './ReduxHooks';
import { toggleForm } from '@/store/slices/authAndRegForm';
import { useEffect, useState } from 'react';

export const useCheckToken = (): boolean => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Состояние для отслеживания состояния меню

  let token = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('user');
  }

  useEffect(() => {
    const validateToken = async (): Promise<void> => {
      try {
        if (token) {
          const isValid = await verifyToken(JSON.parse(token).token);
          if (!isValid) {
            setIsMenuOpen(true); // Если токен не валиден, открываем меню
            dispatch(toggleForm());
          } else {
            setIsMenuOpen(false); // Если токен валиден, оставляем меню закрытым
          }
        } else {
          setIsMenuOpen(true); // Если токен отсутствует, открываем меню
          dispatch(toggleForm());
        }
      } catch (error) {
        console.error('Ошибка при проверке токена:', error);
        setIsMenuOpen(true); // В случае ошибки, открываем меню
        dispatch(toggleForm());
      }
    };

    validateToken();
  }, [token, dispatch]);

  return isMenuOpen;
};

export const useCheckAdmin = (isOpen: boolean): boolean => {
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await isAdmin();
      setAdmin(adminStatus);
    };

    checkAdminStatus();
  }, [isOpen]);

  return admin;
};
