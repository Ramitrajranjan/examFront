import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient:HttpClient) { }

  public getQuestionsOfQuiz(qid:any)
  {
    return this.httpClient.get(`${baseUrl}/question/quiz/all/${qid}`);
  }
  public getQuestionsOfQuizForTest(qid:any)
  {
    return this.httpClient.get(`${baseUrl}/question/quiz/${qid}`);
  }

  public addQuestion(question:any)
  {
    return this.httpClient.post(`${baseUrl}/question/`,question);
  }

  public deleteQuestion(questionId:any)
  {
    return this.httpClient.delete(`${baseUrl}/question/${questionId}`);
  }

  public evalQuiz(questions:any)
  {
    return this.httpClient.post(`${baseUrl}/question/eval-quiz`,questions);
  }
}
