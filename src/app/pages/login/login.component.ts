import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData={
    username:'',
    password:'',}
  constructor(private _snackbar:MatSnackBar,private loginService:LoginService,private router:Router) {}
  formSubmit()  {
    if(this.loginData.username.trim()==''||this.loginData.username==null){
      this._snackbar.open('Username is required!!','',{
        duration:2000, });
      return;}
    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this._snackbar.open('password is required!!','',{
        duration:2000,});
      return;
    }
      //request service to generate token
      this.loginService.generateToken(this.loginData).subscribe( (data:any)=>{
      //login
      this.loginService.loginUser(data.token);
      this.loginService.token=data.token;
      this.loginService.getCurrentUser().subscribe(
        (user:any)=>{  
          localStorage.setItem("user",user)
          this.loginService.user=user;         
          //redirect.... admin
          if(this.loginService.getUserRole()=="ADMIN")
          {
              // window.location.href='/admin';
              this.loginService.role="ADMIN";
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
          }
          //redirect ..... normal user
          else if(this.loginService.getUserRole()=="NORMAL")
          {
            // window.location.href='/user-dashboard';
            this.loginService.role="NORMAL";
            this.router.navigate(['user-dashboard/0']);
            this.loginService.loginStatusSubject.next(true);
          }
          else
          {
            this.loginService.logout();
          } 
        })
    },(error)=>{
      console.log(error);
      this._snackbar.open("Invalid credentials !!");
    });
  }
}
