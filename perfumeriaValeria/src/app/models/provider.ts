import { User } from "./user";

export class Provider extends User{
  phone: string;
  direction: string;
  total:string;
  date:string;
  constructor(email: string,
    name: string,
    lastName: string,
    password: string,
    phone: string,
    total:string,
    direction: string,
    date:string) {
    super(email, name, lastName, password);
    this.name = name;
    this.phone = phone;
    this.direction = direction;
    this.total=total;
    this.date=date;
  }
}
