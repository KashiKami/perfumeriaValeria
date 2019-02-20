import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = 'http://localhost/api/user/';

  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post(`${this.baseUrl}authenticate.php`, user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    try {
      localStorage.removeItem('currentOrder');
    } catch (error) {
    }
    
  }
}
