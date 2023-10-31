import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any=null;
  totalQuizzes: any;
  role: any = [];
  isSubmit = true;
  constructor(
    private loginservice: LoginService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.cartService.getquizzes().subscribe((data) => {
      this.totalQuizzes = data.length;
    });
    // this.totalQuizzes=this.cartService.cartItemList.length;
    this.loginservice.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.loginservice.isLoggedIn();
      this.user=this.loginservice.getUser();
      this.role = localStorage.getItem('Role');
      this.isSubmit = false;
    });
  }

  public logout() {
    this.loginservice.logout();
    this.isLoggedIn=false;
    this.user=null;
    // window.location.reload();
    this.router.navigate(["/"]);
    // this.loginservice.loginStatusSubject.next(false);
  }
}

