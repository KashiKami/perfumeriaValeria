import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Perfumeria Valeria';
  show: boolean = null;
  currentUser: User;

  constructor(
    private router: Router) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser != null) {
      this.show = true;
    }
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
