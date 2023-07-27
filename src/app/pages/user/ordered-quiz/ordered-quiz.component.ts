import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-ordered-quiz',
  templateUrl: './ordered-quiz.component.html',
  styleUrls: ['./ordered-quiz.component.css']
})
export class OrderedQuizComponent implements OnInit{
  public id:any
  public quizzes:any
constructor(private router:ActivatedRoute,private checkoutService:CheckoutService){}
ngOnInit(): void {
  this.router.params.subscribe((params)=>{
    this.id=params['id'];
    this.checkoutService.orderedQuizzes(this.id).subscribe(data=>{
      this.quizzes=data      
    })
  });
}
}
