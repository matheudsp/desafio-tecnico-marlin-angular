import { TestBed } from '@angular/core/testing';
import { RickAndMortyService } from './rick-and-morty.service';
import axios from 'axios';
import { of } from 'rxjs';
import { RickAndMortyResponse } from '../models/character';

// Mock do Axios para evitar chamadas reais à API
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RickAndMortyService', () => {
  let service: RickAndMortyService;
  
  // Mock da resposta da API
  const mockApiResponse: RickAndMortyResponse = {
    info: {
      count: 826,
      pages: 42,
      next: 'https://rickandmortyapi.com/api/character/?page=2',
      prev: null
    },
    results: [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth',
          url: 'https://rickandmortyapi.com/api/location/1'
        },
        location: {
          name: 'Earth',
          url: 'https://rickandmortyapi.com/api/location/20'
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/1'],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z'
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RickAndMortyService]
    });
    service = TestBed.inject(RickAndMortyService);
    
    // Reseta os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('deve criar o service', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar os personagens da API', (done) => {
    // Configuramos o mock do Axios para retornar nossa resposta mockada
    mockedAxios.get.mockResolvedValueOnce({ data: mockApiResponse });

    // Chamamos o método do serviço
    service.getCharacters().subscribe(response => {
      // Verificamos se a resposta é igual ao mock
      expect(response).toEqual(mockApiResponse);
      
      // Verificamos se o Axios foi chamado corretamente
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/?page=1'
      );
      
      done();
    });
  });

  it('deve buscar os personagens atraves da pagina especifica', (done) => {
    // Configuramos o mock para a página 3
    mockedAxios.get.mockResolvedValueOnce({ data: mockApiResponse });
    
    // Chamamos o método do serviço com página 3
    service.getCharacters(3).subscribe(response => {
      // Verificamos se a resposta é igual ao mock
      expect(response).toEqual(mockApiResponse);
      
      // Verificamos se o Axios foi chamado com a página correta
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/?page=3'
      );
      
      done();
    });
  });

  it('deve retornar erros da API em caso de erro', (done) => {
    // Configuramos o mock do Axios para rejeitar com erro
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));
    
    // Chamamos o método do serviço
    service.getCharacters().subscribe({
      next: () => {
        // Se entrar aqui, o teste falha porque esperamos um erro
        done.fail('Expected an error but got a successful response');
      },
      error: (error) => {
        // Verificamos se o erro foi capturado corretamente
        expect(error.message).toBe(errorMessage);
        done();
      }
    });
  });
});