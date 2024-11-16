import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular6Project';
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['']);
  }
}
