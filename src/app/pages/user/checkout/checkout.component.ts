import { Component,OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { CheckoutService } from 'src/app/services/checkout.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private app:AppComponent,private cartService:CartService,
    private loginService:LoginService, private checkout:CheckoutService){}
  quizzes:any=[]
  user:any
  tests:any=[]
  order:any={
    id:'',
    cartItems:[],
  };
  isSubmit=true;
  createdOrder:any;
  totalAmount=0;
  ngOnInit(): void {
    // this.app.orderCreate=false;
    this.quizzes=this.cartService.cartItemList;
    this.order.id=this.loginService.user.id;
    this.cartService.getTotalPrice(this.quizzes);
    this.totalAmount=this.cartService.totalAmount;
    this.tests=this.quizzes;
    this.createOrder(); 
  }
  createOrder(){
    this.tests.forEach((item:any) => {
      delete item.active;
      delete item.description;
      delete item.maxMarks;
      delete item.numberOfQuestions;
      delete item.category
      this.order.cartItems.push(item);      
    });

        
  }
  payment(){
    this.checkout.createOrder(this.order).subscribe((data:any)=>{
      this.createdOrder=data;
      this.isSubmit=false             
    },(error:any)=>{console.log(error);
    }) 
    this.cartService.removeAllQuizzes(); 
  }
}
