import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-documentation',
  templateUrl: './view-documentation.component.html',
  styleUrls: ['./view-documentation.component.scss']
})
export class ViewDocumentationComponent implements OnInit {

  constructor(private router: Router) { }

  pdfSrc: string = '../../assets/pdf/sample.pdf';

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['viewClient']);
  }
}
