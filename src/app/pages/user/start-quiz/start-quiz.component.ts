import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  totalQuestions=0;
  totalMarks=0;
  attempted=0;
  unattempted=0;
  correctAnswers=0;
  marksGot=0;
  wrongAnswers=0;
  isSubmit=false;
  qid:any;
  questions:any;

  timer:any;


  constructor(
    private locationSt:LocationStrategy,
    private route:ActivatedRoute,
    private question:QuestionService
    ){}

  ngOnInit(): void 
  {
    this.preventBackButton();
    this.qid=this.route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions()
  {
    this.question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        // console.log(data);
        this.questions=data;
        this.timer=this.questions.length*1*60;

        // this.questions.forEach((q:any)=>{
        //   q['givenAnswer']='';
        // });

        this.startTimer();
      },
      (error)=>{
        console.log(error);
      });
  }
  
  preventBackButton()
  {
    history.pushState(null, '',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    });
  }

  submitQuiz()
  {
    Swal.fire({
      title:'Do you want to submit the quiz?',
      showCancelButton:true,
      confirmButtonText:'Submit',
      denyButtonText:'Cancel',
      icon:'info',
    }).then((e)=>{
      if(e.isConfirmed)
      {
        this.evalQuiz();
      }
    });
  }

  startTimer()
  {
   let t:any= window.setInterval(()=>{
      if(this.timer<=0)
      {
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime()
  {
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min :${ss} sec`
  }

  evalQuiz()
  {
    // this.isSubmit=true;
    //     this.questions.forEach((q:any)=>
    //     {
    //       if(q.givenAnswer==q.answer)
    //       {
    //         this.correctAnswers++;
    //         let marksSingle=this.questions[0].quiz.maxMarks/this.questions[0].quiz.numberOfQuestions;
    //         this.marksGot+=marksSingle;
    //       } 
          
    //       if(q.givenAnswer.trim()!='')
    //       {
    //         this.attempted++;
    //       }
    //     });
    //     this.totalQuestions=this.questions[0].quiz.numberOfQuestions;
    //     this.unattempted=this.totalQuestions-this.attempted;
    //     this.totalMarks=this.questions[0].quiz.maxMarks;

    
    // calling server to evaluate quiz
    this.question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.attempted=data.attempted;
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers=data.correctAnswers;
        this.unattempted=data.unattempted;
        this.totalQuestions=data.totalQuestion;
        this.wrongAnswers=data.wrongAnswers;
        this.totalMarks=data.totalMarks;
        
        this.isSubmit=true;
      },(error)=>{
        console.log(error);
      }
    );
  }

  printPage()
  {
    window.print();
  }
}
