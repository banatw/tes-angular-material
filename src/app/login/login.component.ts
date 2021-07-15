import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.service.doLogin(this.loginForm.value).subscribe((res: any) => {
      this.service.setToken(res.headers.get('Authorization'));
      this.router.navigate(['/admin/dashboard']);
    });
  }
}
