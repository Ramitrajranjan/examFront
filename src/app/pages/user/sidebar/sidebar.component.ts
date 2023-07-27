import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories:any;
  user:any
  
  constructor(private category:CategoryService, private snackbar:MatSnackBar,private loginService:LoginService){}
  ngOnInit(): void {
    this.user=this.loginService.getUser();
    this.category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },(error:any)=>{
        this.snackbar.open("Error in loading categories from server",'',{
          duration:3000,
        });
      }
      );
  }
}
