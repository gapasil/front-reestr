// Сохранение данных в localStorage
export const setItem = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Ошибка при сохранении в localStorage:', error);
  }
};

// Извлечение данных из localStorage
export const getItem = <T>(key: string): T | undefined => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? (JSON.parse(serializedValue) as T) : undefined;
  } catch (error) {
    console.error('Ошибка при извлечении из localStorage:', error);
    return undefined;
  }
};

// Удаление данных из localStorage
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Ошибка при удалении из localStorage:', error);
  }
};

// Очистка localStorage
export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Ошибка при очистке localStorage:', error);
  }
};
