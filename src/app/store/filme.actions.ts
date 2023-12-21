import { createAction, props } from '@ngrx/store';

export const buscarFilme = createAction('[Filme] Buscar Filme', props<{ titulo: string }>());
export const atualizarResultados = createAction('[Filme] Atualizar Resultados', props<{ resultados: any[] }>());
export const limparResultados = createAction('[Filme] Limpar Resultados');
