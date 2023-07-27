import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService implements OnInit {

  constructor(private httpClient:HttpClient) { }

  public quizzes(){
    return this.httpClient.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz:any)
  {
    return this.httpClient.post(`${baseUrl}/quiz/`,quiz);
  }

  public deleteQuiz(qId:any)
  {
    return this.httpClient.delete(`${baseUrl}/quiz/${qId}`);
  }

  public getQuiz(qId:any)
  {
    return this.httpClient.get(`${baseUrl}/quiz/${qId}`);
  }

  public updateQuiz(quiz:any)
  {
     return this.httpClient.put(`${baseUrl}/quiz/`,quiz);
  }
  
  public getQuizzessOfCategory(id:any)
  {
    return this.httpClient.get(`${baseUrl}/quiz/category/${id}`);
  }

  public getActiveQuizzes()
  {
    return this.httpClient.get(`${baseUrl}/quiz/active`);
  }

  public getActiveQuizzesOfCategory(cid:any)
  {
    return this.httpClient.get(`${baseUrl}/quiz/category/active/${cid}`);
  }

  ngOnInit(): void {  }
}
