import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })

  loading: boolean = false;
  messageError: boolean =false;
  public showModal = false;
  public modalMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
    ){}

    onSubmitLoginForm(): void {
      this.loading = true;
      if (this.loginForm.value && this.loginForm.valid) {
        this.userService.authUser(this.loginForm.value as AuthRequest).subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('T_USER', response?.token);
              this.loginForm.reset();
              this.router.navigate(['/home']);
              this.loading = false;
              console.log(`Bem vindo de volta ${response?.username}!`)
              localStorage.setItem("user",response?.username)
              this.loading = false;
            }
          },
          error: (err) => {
            console.log("erro ao fazer login")
            this.loading = false;
            this.showModal = true;
            this.modalMessage = err.error?.message || 'Usuario ou senha inválidos!';

            console.log(err);
            this.loginForm.reset();
          },
        });
      }
    }


  onUsernameInput(event: any): void {
    const newValue = event.target.value.toLowerCase();
    this.loginForm.get('username')?.setValue(newValue);
  }
}

