import { User } from "@acme/shared-models";
import { request } from "../api";

export async function fetchUsers() {
  return await request<User[]>("GET", "/users");
}
