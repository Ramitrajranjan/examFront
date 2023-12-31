import { Component,OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes:any=[];
  constructor(private quiz:QuizService){}
  
  ngOnInit(): void {  
    this.getQuizzes();
  }

  getQuizzes(){
    this.quiz.quizzes().subscribe((data:any)=>{
      this.quizzes=data;
    },(error)=>{
      console.log(error);
      Swal.fire("Error",'Error in loading data from Server','error'); 
    });
  }


  deleteQuiz(qId:any)
  {

    Swal.fire({
      icon:'info',
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.quiz.deleteQuiz(qId).subscribe(
          (data:any)=>{
            this.quizzes=this.quizzes.filter((quiz:any)=>quiz.id!=qId);
            Swal.fire('Success','Quiz deleted','success');
            this.getQuizzes();
          },
          (error:any)=>{
            Swal.fire('Error','Error in deleting Quiz','error');
          }
          );
      }
    });
  }
 
}
