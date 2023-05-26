// IUser.ts
export interface IUser {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

export interface IUserStore {
  Users: IUser[];
  setData: (data: IUser[]) => void;
  
}
