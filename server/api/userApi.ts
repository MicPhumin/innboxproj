import type { Room } from "../../src/type/room.ts";
import api from "./axios.ts";

export const getUsers = () => api.get("/users");
export const reserveUser = (data: Room ) => api.patch("users/reserve",data);
export const uploadQr = (qrImage:any) => api.patch("users/uploadImage",qrImage);
export const checkSlip = (qrImage:any) => api.post("users/checkSlip",qrImage);
// export const getUserById = (id: number) => api.get(`/users/${id}`)
// export const createUser = (data: [{roomType:string}] ) => api.post("/users", data);
// export const deleteUser = (id: number) => api.delete(`/users/${id}`);