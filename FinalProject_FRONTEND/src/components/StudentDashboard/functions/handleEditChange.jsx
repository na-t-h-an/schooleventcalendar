export function handleEditChange(e, setEditData, editData) {
  const { name, value } = e.target;
  setEditData({ ...editData, [name]: value });
}
