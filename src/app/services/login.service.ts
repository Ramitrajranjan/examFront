import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{
  id:any;
  token:any;
  user:any;
  role:any;
  public loginStatusSubject=new Subject<boolean>();
  constructor(private http:HttpClient) { }
  ngOnInit(): void {    }
  //to generate token
  public generateToken(loginData: any){
      return this.http.post(`${baseUrl}/generate-token`,loginData);
  }
  //login user: set token in local storage
  public loginUser(token:any){
    this.token=token;
    return true;
  }
  //get current user
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }
  //user is logged in or not
  public isLoggedIn(){
    let tokenStr=this.token;
    if(tokenStr==undefined||tokenStr==''||tokenStr==null){
      return false;
    }else{
      return true;
    }
  }
  //get token
  public getToken(){
    return this.token;
  }

  // set user detail
  public setUser(user:any){
    this.user=user;
    return user.id;
  }

  //get user details
  public getUser(){
    let userStr=this.user;
    if(userStr!=null){
      return userStr;
    }else{
      this.logout();
      return null;
    }
  }
  //get user role
  public getUserRole()
  {
    return this.user.authorities[0].authority;
  }


  //logout :remove token from the local storage
  public logout()
  {
    return true;
  }

}
