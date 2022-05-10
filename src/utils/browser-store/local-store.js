const getItem = (name) => {
  const itemStr = localStorage.getItem(name);
  const item = itemStr ? JSON.parse(itemStr) : null;
  return item;
};

const setItem = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

const removeItem = (name) => {
  localStorage.removeItem(name);
};

const localStore = { getItem, setItem, removeItem };

export default localStore;
