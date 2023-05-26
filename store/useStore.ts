import { create, createStore } from 'zustand';
import axios from 'axios';

const useUserStore = create((set:any) => ({
  Users: [],
  setUsers: (users:any) => set({ Users: users }),
}));

export default useUserStore;