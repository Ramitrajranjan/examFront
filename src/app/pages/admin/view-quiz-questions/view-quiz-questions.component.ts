import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions:any=[];

  constructor(
    private activatedRoute:ActivatedRoute,
    private question:QuestionService,
    private snackbar:MatSnackBar,)
    {}
  ngOnInit(): void {
    this.qId=this.activatedRoute.snapshot.params['id'];
    this.qTitle=this.activatedRoute.snapshot.params['title'];
     this.getQuestionsOfQuiz()
  }
  getQuestionsOfQuiz(){
    this.question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
      },(error:any)=>{
        console.log(error);  
      }
    );
  }
  deleteQuestion(quesId:any)
  {
    this.question.deleteQuestion(quesId).subscribe((data:any)=>{
      this.questions=this.questions.filter((q:any)=>q.questionId!=quesId);
      this.snackbar.open('Question deleted','',{
        duration:2000,
      });
      this.getQuestionsOfQuiz();
    },(error:any)=>{
      this.snackbar.open('Error in deleting question','',{
        duration:2000,
      });
    });    
  }
}
