import { createReducer, on } from '@ngrx/store';
import * as FilmeActions from './filme.actions';

export interface FilmeState {
  resultados: any[]; // Defina o tipo de resultado conforme a estrutura real da resposta da API
}

export const initialState: FilmeState = {
  resultados: [],
};

export const filmeReducer = createReducer(
  initialState,
  on(FilmeActions.buscarFilme, (state, { titulo }) => ({
    ...state,
    resultados: [], // Limpa os resultados antes de realizar uma nova busca
  })),
  on(FilmeActions.limparResultados, (state) => ({
    ...state,
    resultados: [],
  }))
);
