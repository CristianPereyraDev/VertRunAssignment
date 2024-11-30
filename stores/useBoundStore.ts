import { create } from 'zustand';
import { createUserSlice, UserSlice } from './createUserSlice';
import { ActivitiesSlice, createActivitySlice } from './createActivitySlice';

export const useBoundStore = create<UserSlice & ActivitiesSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createActivitySlice(...a),
}));
