import { User } from "./user";

export class Client extends User{
  direction: string;
  identify: string;
  phone: string;

  constructor(email: string,
    name: string,
    lastName: string,
    password: string,
    direction: string,
    identify: string,
    phone: string) {
    super(email, name, lastName, password);
    this.direction = direction;
    this.identify = identify;
    this.phone = phone;
  }

}
