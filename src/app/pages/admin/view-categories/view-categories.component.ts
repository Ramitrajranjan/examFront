import { Component,OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit{
  categories:any=[];


  constructor(private category:CategoryService){}
  ngOnInit(): void {
    this.getCategories()
  }
  private getCategories(){
    this.category.categories().subscribe((data:any)=>{
      this.categories=data;
    },(error)=>{
      console.log(error);
      Swal.fire("Error",'Error in loading data from Server','error'); 
    });
  }
  updateCategory(category:any){
    this.category.updateCategory(category);
    this.categories=this.getCategories();
  }

  deleteCategory(id:any)
  {
    Swal.fire({
      icon:'info',
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.category.deleteCategory(id).subscribe(
          (data:any)=>{
            this.categories=this.categories.filter((category:any)=>category.id!=id);
            Swal.fire('Success','Category deleted','success');
            this.getCategories();
          },
          (error:any)=>{
            Swal.fire('Error','Error in deleting Quiz','error');
          }
          );
      }
    });
  }
}

