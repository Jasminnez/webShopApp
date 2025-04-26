import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgIf, TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, NgIf, BsDropdownModule, TitleCasePipe, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService)
  loggedIn: boolean = false;
  model: any = {};


  login(){
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.loggedIn = true;
      },
      error: (error) => {
        this.toastr.error(error.error);
        this.loggedIn = false;
      }
    })
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.loggedIn = false;
  }
}
