export const storageHelper = {
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Ошибка сохранения в LocalStorage', e);
    }
  },
  load: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Ошибка чтения из LocalStorage', e);
      return null;
    }
  }
};