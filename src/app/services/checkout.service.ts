import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService implements OnInit {

  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    
  }
  public createOrder(order:any)
  {
    return this.http.post(`${baseUrl}/createOrder/`,order);
  }
  public orderedQuizzes(id:any)
  {
    return this.http.get(`${baseUrl}/order/user/${id}`)
  }
}
