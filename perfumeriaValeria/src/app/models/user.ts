export class User {
  email: string;
  name: string;
  lastName: string;
  password: string;
  direction: string;
  phone: string;
  identify: string;
  typeUser: string;
  constructor(email: string,
    name: string,
    lastName: string,
    password: string) {
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.password = password;
  }

  public hoal() {

  }
}
