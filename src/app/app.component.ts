import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet,Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'PFEATBfront-end';
  Homepage = false;
  constructor(private router: Router) { }

  //goToNewUser() {
    //this.router.navigate(['/newuser']);
  //}


  ngOnInit(): void {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {

          this.Homepage = this.router.url === '/';
      }
    });
 }
}
