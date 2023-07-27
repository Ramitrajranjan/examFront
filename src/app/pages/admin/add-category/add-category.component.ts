import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{
  
  category:any={
    title:'',
    description:'',
  };
  
  constructor(private catergory:CategoryService,private snack:MatSnackBar){}
  ngOnInit(): void {  }
  formSubmit(){
    if(this.category.title.trim()==''|| this.category.title==null)
    {
        this.snack.open("Title required",'',{duration:2000});
        return;
    }
    this.catergory.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire("Success!!",'Category is added successfully','success');
        console.log(data);
      },
      (error:any)=>{
        Swal.fire("Error!!",'Server Error','error');
        console.log(error);
      }
    );
  }

}
