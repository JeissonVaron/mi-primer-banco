import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  passwordTypeInput = 'password';
  user: User = undefined;
  loading = false;
  form: FormGroup;
  logIn = true;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: new FormControl('jeissonrodriguez.varon@gmail.com', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('123456789', Validators.compose([Validators.required])),
    });
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    if (this.form.invalid) {
      for (const prop in this.form.controls) {
        this.form.controls[prop].markAsTouched();
      }
    }
    this.loading = true;
    this.user = {
      email: this.f.email.value,
      password: this.f.password.value
    }
    if (this.logIn) {
      const user = await this.authService.onLogin(this.user);
      this.loading = false;
      if (user) {
        this.storage.set('onLogin', {
          email: user.user.email,
          uid: user.user.uid
        });
        setTimeout(() => {
          this.router.navigateByUrl("/dashboard");
        }, 100);
      }
    } else {
      const user = await this.authService.onRegister(this.user);
      this.loading = false;
      if (user) {
        this.storage.set('onLogin', {
          email: user.user.email,
          uid: user.user.uid
        });
        setTimeout(() => {
          this.router.navigateByUrl("/dashboard");
        }, 100);
      }
    }
    return;
  }

  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    const inputSelection = nativeEl.selectionStart;
    nativeEl.focus();
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);

  }
}
