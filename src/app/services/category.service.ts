import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnInit {

  constructor(private httpClient:HttpClient) { }
  ngOnInit(): void {  }
  // =================================================================
  public categories()
  {
    return this.httpClient.get(`${baseUrl}/category/`);
  }

  // =====================================================================
  public addCategory(category:any)
  {
    return this.httpClient.post(`${baseUrl}/category/`,category);
  }

  public updateCategory(category:any){
    return this.httpClient.put(`${baseUrl}/category/`,category);
  }

  public deleteCategory(id:any)
  {
    return this.httpClient.delete(`${baseUrl}/category/${id}`);
  }
}
