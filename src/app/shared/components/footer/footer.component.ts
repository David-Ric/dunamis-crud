import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private router: Router) {}

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }

  forHome(): void {
    this.router.navigate(['/home']);
  }

  forEntrada(): void {
    this.router.navigate(['/entrada']);
  }

  forClassificacao(): void {
    this.router.navigate(['/classificacao']);
  }
  forPesagem(): void {
    this.router.navigate(['/pesagem']);
  }
}
