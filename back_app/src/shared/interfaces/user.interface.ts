export interface InterfaceUser {
  id: number;
  gender: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  biography: string;
  hobbies: string;
  salt: string;

  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
}
