import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService{  
  constructor(private httpClient:HttpClient) { }

  // add user
  public addUser(user:any)
  {
    return this.httpClient.post(`${baseUrl}/register`,user);
  }

  // public getUser(id:any){
  //   return this.httpClient.get(`${baseUrl}/user/${id}`)
  // }

}
