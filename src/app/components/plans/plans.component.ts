import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Plan } from '../../models/plan';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  plans: Plan[] = [];
  filteredPlans: Plan[] = [];
  search = '';
  sortOrder = '';

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.planService.getPlans().subscribe((data) => {
      this.plans = data;
      this.filteredPlans = data;
    });
  }

  onSearch(): void {
    this.filteredPlans = this.plans.filter((plan) =>
      plan.nome.toLowerCase().includes(this.search.toLowerCase())
    );
    this.sortPlans();
  }

  onSort(): void {
    this.sortPlans();
  }

  private sortPlans(): void {
    if (this.sortOrder === 'asc') {
      this.filteredPlans.sort(
        (a, b) => parseFloat(a.valor) - parseFloat(b.valor)
      );
    } else if (this.sortOrder === 'desc') {
      this.filteredPlans.sort(
        (a, b) => parseFloat(b.valor) - parseFloat(a.valor)
      );
    }
  }
}