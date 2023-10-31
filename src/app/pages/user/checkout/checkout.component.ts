import { Component,OnInit,Injector,NgZone } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { CheckoutService } from 'src/app/services/checkout.service';


declare var Razorpay:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private app:AppComponent,private cartService:CartService,
    private loginService:LoginService, private checkout:CheckoutService,
    private injector:Injector){}
  quizzes:any=[]
  user:any
  tests:any=[]
  order:any={
    id:'',
    transactionId:'',
    cartItems:[],
  };
  isSubmit=true;
  createdOrder:any;
  totalAmount=0;
  ngOnInit(): void {
    this.user=this.loginService.getCurrentUser();
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
  createTransactionAndPlaceOrder(){
    let amount=this.totalAmount;    
    this.cartService.createTransaction(amount).subscribe((data:any)=>{
      this.openTransactionModal(data)
    },(error:any)=>{
      console.log(error);
    }); 
  }
  openTransactionModal(response:any){
   var options={
    order_id:response.orderId,
    key:response.key,
    amount:response.amount,
    currency:response.currency,
    name:this.user.username,
    description:'Payment for online shopping',
    image:'https://cdn.vectorstock.com/i/preview-1x/45/39/quiz-game-icon-speech-bubble-vector-47454539.jpg',
    handler:(response: any)=> {
      if(response!=null && response.razorpay_payment_id!=null)
      {
        this.processResponse(response);
      }else{
        alert("Payment Failed");
      }
    },
    prefill:{
      name:this.user.username,
      email:this.user.email,
      contact:this.user.phone,
    },
    notes:{
      address:this.user.address
    },
    theme:{
      color:'#F372FF'
    }
   };   
   var razorPayObject=new Razorpay(options);
   razorPayObject.open();
  }
  processResponse(resp:any){
    this.order.transactionId=resp.razorpay_payment_id
    const ngZone=this.injector.get(NgZone);
    ngZone.run(()=>{ 
        this.store();
      });
  }
  store(){
    this.checkout.createOrder(this.order).subscribe((data:any)=>{
      this.createdOrder=data;
      this.isSubmit=false             
    },(error:any)=>{console.log(error);
    }) 
    this.cartService.removeAllQuizzes();
  }
}
