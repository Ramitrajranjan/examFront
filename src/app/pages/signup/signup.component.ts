import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit 
{
 
  constructor(private userService:UserService, private _snackBar:MatSnackBar,private router:  Router){}
 
  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }
  
  ngOnInit(): void {}

  formSubmit()
  {
   console.log(this.user);
   if(this.user.username==''||this.user.username == null)
   {
      this._snackBar.open('Username is required !!','',{
        duration:2000,
      // verticalPosition:'top',
      // horizontalPosition:'right'
      });
    return;
  }

  this.userService.addUser(this.user).subscribe(
    (data:any)=>{
      //success
      Swal.fire('Registered Successfully','User id is '+ data.id ,'success');
      this.router.navigate(["/login"]);
    },
    (error)=>{
      //error
        this._snackBar.open('Something went wrong !!','',{
          duration:2000,
          // verticalPosition:'top',
          // horizontalPosition:'right'
        });
    }
  );
}
}
