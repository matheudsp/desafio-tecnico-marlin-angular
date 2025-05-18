import { TestBed } from '@angular/core/testing';
import { PlanService } from './plan.service';
import axios from 'axios';
import { Plan } from '../models/plan';

// Mock para o axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PlanService', () => {
  let service: PlanService;

  // Dados mockados para simular a resposta da API
  const mockPlansData: Plan[] = [
    { nome: 'Plano Dental 1', valor: '30,00', descricao: 'Descrição teste 1' },
    { nome: 'Plano Dental 2', valor: '80,00', descricao: 'Descrição teste 2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanService],
    });

    // Inicializa o serviço
    service = TestBed.inject(PlanService);

    jest.clearAllMocks();
  });

  // Teste básico para verificar se o serviço foi criado
  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  // Teste para verificar se o método getPlans chama o axios.get corretamente
  it('deve chamar axios.get com a URL correta', () => {
    // Configura o mock para retornar dados simulados
    mockedAxios.get.mockResolvedValue({ data: mockPlansData });

    // Chama o método getPlans
    service.getPlans().subscribe();

    // Verifica se o axios.get foi chamado com a URL correta
    expect(mockedAxios.get).toHaveBeenCalledWith('assets/plans.json');
  });

  // Teste para verificar se o método getPlans retorna os dados corretos
  it('deve retornar os dados corretos quando axios.get é bem-sucedido', (done) => {
    // Configura o mock para retornar dados simulados
    mockedAxios.get.mockResolvedValue({ data: mockPlansData });

    // Chama o método getPlans e verifica a resposta
    service.getPlans().subscribe((plans) => {
      // Verifica se os dados recebidos são iguais aos dados mock
      expect(plans).toEqual(mockPlansData);

      // Verifica se há o número correto de planos
      expect(plans.length).toBe(2);

      // Verifica se o primeiro plano tem os dados corretos
      expect(plans[0].nome).toBe('Plano Dental 1');
      expect(plans[0].valor).toBe('30,00');

      done(); // Finaliza o teste assíncrono
    });
  });
});
