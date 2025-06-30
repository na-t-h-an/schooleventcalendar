export const handleEditChange = (e, setEditData) => {
  const { name, value } = e.target;
  setEditData(prev => ({ ...prev, [name]: value }));
};
