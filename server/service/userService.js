import axios from "axios";

export const getUsersService = () => {

   return users
};

export const getUserByIdService = (id) => {
  return users.find(u => u.roomId === Number(id));
};

export const createUserService = (data) => {
  const newUser = {
    roomId: users.length + 1,
    roomType: data.roomType,
  };

  users.push(newUser);
  return newUser;
};

export const deleteUserService = (id) => {
    const userId = Number(id);

  console.log("SERVICE DELETE ID:", userId);
  console.log("USERS:", users);

  const index = users.findIndex(u => u.roomId === userId);
  console.log("USERS:index", index);
  if (index === -1) return null;

  return users.splice(index, 1)[0];

};