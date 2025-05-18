// plans.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlansComponent } from './plans.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('PlansComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlansComponent],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter plans', () => {
    component.plans = [
      { nome: 'Plano Dental 1', valor: '30.00', descricao: 'Test' },
      { nome: 'Plano Dental 2', valor: '80.00', descricao: 'Test' }
    ];
    component.search = '1';
    component.onSearch();
    expect(component.filteredPlans.length).toBe(1);
  });
});
