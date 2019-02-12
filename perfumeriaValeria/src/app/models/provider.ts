import { User } from "./user";

export class Provider extends User{
  phone: string;
  direction: string;
  constructor(email: string,
    name: string,
    lastName: string,
    password: string,
    phone: string,
    direction: string) {
    super(email, name, lastName, password);
    this.name = name;
    this.phone = phone;
    this.direction = direction;
  }
}
