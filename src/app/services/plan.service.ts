import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Plan } from '../models/plan';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private url = 'assets/plans.json'; //caminho local

  constructor() {}

  getPlans(): Observable<Plan[]> {
    // Usando AXIOS para receber os planos
    // Converte PROMISE para OBSERVABLE c/ operador 'from' 
    return from(
      axios
        .get<Plan[]>(this.url)
        .then((response: { data: Plan[] }) => response.data)
    );
  }
}
