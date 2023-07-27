import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  public quizzes:any=[]
  public grandTotal:number=0;
  constructor(private cartService:CartService, private router:Router, private app:AppComponent){}

  ngOnInit(): void {
    this.app.orderCreate=true;
      this.quizzes=this.cartService.cartItemList;
  }
  delete(quiz:any){
    this.cartService.removeSingleQuiz(quiz);
    this.quizzes=this.cartService.cartItemList;
  }
  emptyCart(){
    this.cartService.removeAllQuizzes();
    this.quizzes=this.cartService.cartItemList;
  }
  checkout(){
      Swal.fire({
        title: 'Do you want to place order',
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Continue',
        confirmButtonColor:'green',
        cancelButtonText:'No',
        cancelButtonColor:'red'
        // denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.router.navigate(["/checkout"]);
        }
      })
  }
}
