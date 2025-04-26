import { Component, inject, OnInit, output} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { JsonPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  private accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  cancelRegister = output<boolean>();
  model = {} as any;
  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void{
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('',  [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')]),
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }

  register(){
    if (this.registerForm.valid) {
      const values = this.registerForm.value;
      this.model = {
        username: values.username,
        email: values.email,
        password: values.password
      };
  
      this.accountService.register(this.model).subscribe({
        next: () => {
          this.toastr.success('Registration successfully');
          this.cancel();
        },
        error: error => {
          this.toastr.error(error.error);
          console.error('Registration error:', error);
        }
      });
    } else {
      this.toastr.warning('Please fill out all fields correctly');
    }
  }

  cancel(){
    this.router.navigateByUrl('/');
  }
}
