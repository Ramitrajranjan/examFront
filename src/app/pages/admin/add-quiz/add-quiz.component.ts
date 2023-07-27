import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  
  categories:any=[];

  quizData:any={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    price:'',
    category:{id:'',},
  };

  constructor(private categoryService:CategoryService,private snackbar:MatSnackBar,private quizService:QuizService){}

  ngOnInit(): void 
  {
    this.categoryService.categories().subscribe((data:any)=>{
      this.categories=data;
    },(error)=>{
      Swal.fire('Error!!','Error in loading data from server','error');
    });
  }
  addQuiz()
  {
    if(this.quizData.title.trim()==''|| this.quizData.title==null)
    {
      this.snackbar.open("Title required",'',{duration:2000,});
      return;
    }
    this.quizService.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        this.quizData.title='';
        this.quizData.description='';
        this.quizData.maxMarks='';
        this.quizData.numberOfQuestions='';
        this.quizData.active=true;
        this.quizData.price='',
        this.quizData.category.id='';
      Swal.fire('Success','Quiz is added','success');
    },
    (error:any)=>{
      Swal.fire('Error!!','Error from server end','error');    
    });
  }
}
