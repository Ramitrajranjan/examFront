import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qId:any;
  qTitle:any;
  question:any={
    quiz:{    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  constructor(private activatedRoute:ActivatedRoute,private questionService:QuestionService){}
  ngOnInit(): void {
    this.qId=this.activatedRoute.snapshot.params['qid'];
    this.qTitle=this.activatedRoute.snapshot.params['title'];
    this.question.quiz['qId']=this.qId;
  }

  formSubmit()
  {
    if(this.question.content.trim()==''|| this.question.content==null)
    {
      return;
    }
    if(this.question.option1.trim()==''|| this.question.option1==null)
    {
      return;
    }
    if(this.question.option2.trim()==''|| this.question.option2==null)
    {
      return;
    }
    if(this.question.answer.trim()==''|| this.question.answer==null)
    {
      return;
    }
    this.questionService.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success','Question Added','success');
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';
      },(error:any)=>{
        Swal.fire('Error!!','Error in Adding question','error');
      });
  }

}
