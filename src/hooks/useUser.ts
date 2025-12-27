import { getUsers } from "../../server/api/userApi";

export const useUser = () => {
  const fetchUsers = () => getUsers();
  // const deleteUser = (id:number) => deleteUserById(id);

  return { fetchUsers };
};