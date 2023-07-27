import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

qId=0;
quizData:any;
categories:any;
  constructor(
    private route:ActivatedRoute,
    private quizService:QuizService,
    private category:CategoryService,
    private router:Router){}
  ngOnInit(): void 
  {
      this.qId= this.route.snapshot.params['qid'];
      this.quizService.getQuiz(this.qId).subscribe(
        (data:any)=>
        {
        this.quizData=data;
        console.log(this.quizData);
        },(error:any)=>
        {
          console.log(error);
        }
      );

      this.category.categories().subscribe((data:any)=>{
          this.categories=data;
        },(error:any)=>{
          alert("Error in loading categories");
        });
  }

  public updateData()
  {
    this.quizService.updateQuiz(this.quizData).subscribe(
      (data:any)=>
      {
        Swal.fire('Success!!','Quiz Updated','success').then((e)=>{
          this.router.navigate(['/admin/quizzes']);
        });
      },(error:any)=>
      {
        Swal.fire('Error!!','Quiz not Updated','error');
      }
    );
  }


}
