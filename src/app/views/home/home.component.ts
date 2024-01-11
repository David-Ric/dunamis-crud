import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: string | null = null;

  ngOnInit(): void {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      this.user = storedUser;
    }
  }
}
