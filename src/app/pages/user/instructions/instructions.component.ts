import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{
  qid:any;
  quizData:any;
  constructor(
    private route:ActivatedRoute,
    private quiz:QuizService,
    private router:Router){}
  ngOnInit(): void {
    this.qid=this.route.snapshot.params['qid'];
    this.quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        // console.log(data);
        this.quizData=data;
      },(error)=>{
        alert("Error in loading quiz data");
      }); 
  }

  startQuiz()
  {
    Swal.fire({
      title: 'Do you want to start the quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Cancel`,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
        this.router.navigate(['/start/'+this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
