export interface IUser {
  id?: number;
  username: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  role: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUserInput {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  role?: "user" | "admin";
}