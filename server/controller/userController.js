import {
  getUsersService,
  getUserByIdService,
  createUserService,
  deleteUserService
} from "../service/userService.js";


export const getUsers = (req,res)=>{
  return users;
}
export const getUserById = (req, res) => {
  const { id } = req.params;
  const users = getUserByIdService(id);
   res.json(users);
};

export const createUser = (req, res) => {
  const {roomType} = req.body;

  const newUser = createUserService({roomType})
  res.status(201).json({
    message: "User created",
    data: newUser,
  });
};

export const updateUser = (req, res) => {
  res.json({
    message: "User updated",
    id: req.params.id,
    data: req.body,
  });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  console.log("CONTROLLER DELETE ID:", id);

  const deleted = deleteUserService(id);

  if (!deleted) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted", data: deleted });
 
};
