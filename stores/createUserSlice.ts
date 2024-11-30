import { StateCreator } from 'zustand';

export interface User {
  accessToken: string;
  id: string;
  username: string;
}

export interface UserSlice {
  user: User | null;
  setUser: (user: User) => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  user: null,
  setUser: (user: User) => set((state) => ({ user: user })),
});
