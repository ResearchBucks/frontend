import { UserRoles, UserStatus } from '@/enum/user';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRoles;
  dob?: Date;
  profileImage?: string;
  status?: UserStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface getAllUsersResponse{
  users: IUser[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}