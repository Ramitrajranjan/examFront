import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{

  public catId:any;
  public quizzes:any;
  public quizList:any;
  constructor(private router:ActivatedRoute,private  quiz:QuizService,private cartService:CartService){}
  
  ngOnInit(): void {
    this.router.params.subscribe((params)=>{
      this.catId=params['catId'];
      if(this.catId==0){
        this.quiz.getActiveQuizzes().subscribe(data=>{
          this.quizzes=data;});
      }else{
        this.quiz.getActiveQuizzesOfCategory(this.catId).subscribe(data=>{
          this.quizzes=data;});
      }
    });
  }
  addToCart(quiz:any){  
    this.cartService.addToCart(quiz);    
  }
}