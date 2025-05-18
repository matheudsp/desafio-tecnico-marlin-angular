import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../models/plan';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private url = 'assets/plans.json';
  
  constructor(private http: HttpClient) {}
  
  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.url);
  }
}