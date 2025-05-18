import { Injectable } from '@angular/core';
import axios from 'axios';
import { RickAndMortyResponse } from '../models/character';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private baseUrl = 'https://rickandmortyapi.com/api/character';

  constructor() {}

  getCharacters(page: number = 1): Observable<RickAndMortyResponse> {
    const request = axios.get<RickAndMortyResponse>(
      `${this.baseUrl}/?page=${page}`
    );
    return from(request.then((res) => res.data));
  }
}
