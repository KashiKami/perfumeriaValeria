import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardProvider implements CanActivate {
  currentUser: User;

  constructor(private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     if (this.currentUser != null && this.currentUser.typeUser=='P') {
       // logged in so return true
       
      return true;
     }

     if (this.currentUser != null && this.currentUser.typeUser == 'A') {
       // logged in so return true
       this.router.navigate(['/admin/products']);
       return true;
     }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/viewClient']);
    return false;
  }
}