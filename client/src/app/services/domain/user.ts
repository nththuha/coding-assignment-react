import { User } from "@acme/shared-models";
import { request } from "../api";

export async function getUsers() {
  return await request<User[]>("GET", "/users");
}

export async function getUserById(id: number) {
  return await request<User>("GET", `/users/${id}`);
}
