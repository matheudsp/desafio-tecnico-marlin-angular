import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PlansComponent } from './plans.component';
import { PlanService } from '../../services/plan.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

// Mock do serviço PlanService
class MockPlanService {
  // Array para simular o retorno da API
  mockPlans = [
    { nome: 'Plano Dental 1', valor: '30,00', descricao: 'Descrição teste 1' },
    { nome: 'Plano Dental 2', valor: '80,00', descricao: 'Descrição teste 2' },
    { nome: 'Plano Dental 3', valor: '150,00', descricao: 'Descrição teste 3' }
  ];
  

  getPlans() {
    return of(this.mockPlans);
  }
}

describe('PlansComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;
  let planService: PlanService;
  let compiled: HTMLElement;

  // Configuração antes de cada teste
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        PlansComponent
      ],
      providers: [
        // Substitui o serviço real pelo mockado
        { provide: PlanService, useClass: MockPlanService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlansComponent);
    component = fixture.componentInstance;
    planService = TestBed.inject(PlanService);
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges(); 
  });

  // Teste básico para verificar se o componente foi criado
  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  // Teste para verificar se os planos estão sendo carregados corretamente
  it('deve carregar os planos no ngOnInit', () => {
    // Chama o método getPlans do serviço
    const spy = jest.spyOn(planService, 'getPlans');
    
    // Chama manualmente o ngOnInit para garantir que ele seja executado
    component.ngOnInit();
    
    // Verifica se o método foi chamado
    expect(spy).toHaveBeenCalled();
    
    // Verifica se os planos foram carregados corretamente
    expect(component.plans.length).toBe(3);
    expect(component.filteredPlans.length).toBe(3);
  });

  // Teste para verificar a funcionalidade de busca
  it('deve filtrar os planos quando o método onSearch é chamado', () => {
    // Define os planos para teste
    component.plans = [
      { nome: 'Plano Dental 1', valor: '30,00', descricao: 'Descrição teste' },
      { nome: 'Plano Dental 2', valor: '80,00', descricao: 'Descrição teste' },
      { nome: 'Plano Dental 3', valor: '150,00', descricao: 'Descrição teste' }
    ];
    
    // Define o input de busca
    component.search = '1';
    
    // Chama o método de busca
    component.onSearch();
    
    // Verifica se o filtro está funcionando corretamente
    expect(component.filteredPlans.length).toBe(1);
    expect(component.filteredPlans[0].nome).toBe('Plano Dental 1');
  });

  // Teste para verificar a ordenação por preço (asc)
  it('deve ordenar os planos por preço ascendente', () => {
    // Define os planos para teste
    component.filteredPlans = [
      { nome: 'Plano Dental 2', valor: '80,00', descricao: 'Descrição teste' },
      { nome: 'Plano Dental 1', valor: '30,00', descricao: 'Descrição teste' },
      { nome: 'Plano Dental 3', valor: '150,00', descricao: 'Descrição teste' }
    ];
    
    // Define a ordem de classificação como asc
    component.sortOrder = 'asc';
    
    // Chama o método de ordenação
    component.onSort();
    
    // Verifica se a ordenação está correta
    expect(component.filteredPlans[0].nome).toBe('Plano Dental 1');
    expect(component.filteredPlans[1].nome).toBe('Plano Dental 2');
    expect(component.filteredPlans[2].nome).toBe('Plano Dental 3');
  });

  // Teste para verificar a ordenação por preço (descendente)
  it('deve ordenar os planos por preço descendente', () => {
    // Define os planos para teste
    component.filteredPlans = [
      { nome: 'Plano Dental 2', valor: '80,00', descricao: 'Descrição teste' },
      { nome: 'Plano Dental 1', valor: '30,00', descricao: 'Descrição teste' },
      { nome: 'Plano Dental 3', valor: '150,00', descricao: 'Descrição teste' }
    ];
    
    // Define a ordem de classificação como desc
    component.sortOrder = 'desc';
    
    // Chama o método de ordenação
    component.onSort();
    
    // Verifica se a ordenação está correta
    expect(component.filteredPlans[0].nome).toBe('Plano Dental 3');
    expect(component.filteredPlans[1].nome).toBe('Plano Dental 2');
    expect(component.filteredPlans[2].nome).toBe('Plano Dental 1');
  });
});