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
    localStorage.setItem('token',token);
    return true;
  }
  //get current user
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }
  //user is logged in or not
  public isLoggedIn(){
    let tokenStr=localStorage.getItem("token");
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
    localStorage.setItem("user",JSON.stringify(user));
    return user.id;
  }

  //get user details
  public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }
  //get user role
  public getUserRole()
  {
    let user=this.getUser();
    localStorage.setItem("Role",user.authorities[0].authority);
    return user.authorities[0].authority;
  }


  //logout :remove token from the local storage
  public logout()
  {
    localStorage.clear();
    return true;
  }

}
