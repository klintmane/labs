const genList = (item, count) => {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push(item);
  }
  return list;
};

export default genList;
