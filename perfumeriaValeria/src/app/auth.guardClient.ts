import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardClient implements CanActivate {
  currentUser: User;

  constructor(private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     if (this.currentUser != null && this.currentUser.typeUser == 'P') {
       // logged in so return true 
      this.router.navigate(['/provider']);
      return false;
     }
     if (this.currentUser != null && this.currentUser.typeUser == 'A') {
       // logged in so return true 
       this.router.navigate(['/admin/products']);
       return false;
     }
     if (this.currentUser != null && this.currentUser.typeUser == 'C') {
       // logged in so return true 
       return true;
     }

    // not logged in so redirect to login page with the return url
    return false;
  }
}
