import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Plan } from '../models/plan';
import axios from 'axios';
import plans from '../../assets/plans.json'; //caminho local
@Injectable({
  providedIn: 'root',
})
export class PlanService {
  getPlans(): Observable<Plan[]> {
    // Usando AXIOS para receber os planos
    // Converte PROMISE para OBSERVABLE c/ operador 'from'
    return of(plans);
  }
}
