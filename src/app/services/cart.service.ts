import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{

  public cartItemList:any=[]
  public quizList=new BehaviorSubject<any>([]);
  public totalAmount=0
  constructor(private httpClient:HttpClient) { }
  ngOnInit(): void { 
  }
  public createTransaction(amount:any){
    return this.httpClient.get(`${baseUrl}/createOrder/createTransaction/${amount}`);
  }
  
  getquizzes(){
    return this.quizList.asObservable();
  }
  setquizzes(quiz:any){
    this.cartItemList.push(...quiz);
    this.quizList.next(quiz); 
  }
  addToCart(quiz:any){
    this.cartItemList.push(quiz);
    this.quizList.next(this.cartItemList);
  }
  getTotalPrice(quizzes:any){
    let grandTotal=0;
    quizzes.forEach((element:any) => {
      grandTotal+=element.price;
    });
    this.totalAmount=grandTotal;
  }
  removeSingleQuiz(quiz:any){
    const index = this.cartItemList.findIndex((item:any) => item.qId === quiz.qId);
    if (index !== -1) {
      this.cartItemList.splice(index, 1);
    }
    this.quizList.next(this.cartItemList) 
  }
  removeAllQuizzes(){
    this.cartItemList=[]
    this.quizList.next(this.cartItemList);
  }
}
