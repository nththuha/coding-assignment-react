import { fetchUsers } from "@/services/domain";
import { User } from "@acme/shared-models";
import { create } from "zustand";

const USERS_KEY = "__USERS__";

type UserStore = {
  users: Map<number, User>;
  set: (users: User[]) => void;
  load: (noCache?: boolean) => Promise<void>;
};

export default create<UserStore>((set, get) => ({
  users: new Map(),
  set: (users: User[]) =>
    set(() => ({
      users: new Map(users.map((e) => [e.id, e])),
    })),
  load: async (noCache = false) => {
    if (localStorage[USERS_KEY] && !noCache) {
      const users = JSON.parse(localStorage[USERS_KEY]);
      if (users.length > 0) {
        get().set(users);
        return;
      }
    }
    const data = await fetchUsers();
    localStorage[USERS_KEY] = JSON.stringify(data);
    get().set(data || []);
  },
}));
