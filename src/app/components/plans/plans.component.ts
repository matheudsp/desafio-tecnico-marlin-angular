import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Plan } from '../../models/plan';
import { PlanService } from '../../services/plan.service';
import { Character } from '../../models/character';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  // API JSON PLANOS
  plans: Plan[] = [];
  filteredPlans: Plan[] = [];
  search = '';
  sortOrder = '';

  // RICK AND MORTY API
  chars: Character[] = [];
  filteredChars: Character[] = [];
  charSearch = '';
  charSortOrder = '';

  // Alternar renderização entre planos e personagens do RICK AND MORTY
  // Default: PLANS
  viewMode: 'plans' | 'characters' = 'plans';
  currentPage = 1;
  totalPages = 0;
  isLoading = false;

  constructor(
    private planService: PlanService,
    private rickAndMortyService: RickAndMortyService
  ) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.planService.getPlans().subscribe({
      next: (data) => {
        this.plans = data;
        this.filteredPlans = data;
      },
      error: (err) => {
        console.error('Error ao carregar planos: ', err);
      },
    });
  }
  // Alterna renderização entre 2 elementos HTML
  toggleView(mode: 'plans' | 'characters'): void {
    this.viewMode = mode;
    if (mode === 'characters' && this.chars.length === 0) {
      this.loadChars();
    }
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

  // Carrega os personagens da API
  loadChars(page: number = 1): void {
    this.isLoading = true;
    this.rickAndMortyService.getCharacters(page).subscribe({
      next: (response) => {
        this.chars = response.results;
        this.filteredChars = response.results;
        this.currentPage = page;
        this.totalPages = response.info.pages;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error ao carregar personagens: ', err);
        this.isLoading = false;
      },
    });
  }

  // Metodo de paginacao RICK AND MORTY
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadChars(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadChars(this.currentPage - 1);
    }
  }

  onCharSearch(): void {
    this.filteredChars = this.chars.filter((char) =>
      char.name.toLowerCase().includes(this.charSearch.toLowerCase())
    );
    this.sortChars();
  }

  onCharSort(): void {
    this.sortChars();
  }

  private sortChars(): void {
    if (this.charSortOrder === 'asc') {
      this.filteredChars.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.charSortOrder === 'desc') {
      this.filteredChars.sort((a, b) => b.name.localeCompare(a.name));
    }
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
