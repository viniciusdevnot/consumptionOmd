import { HomeService } from './../../services/home.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/filme.state';
import * as FilmeActions from '../../store/filme.actions';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Filme } from '../../models/filme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  pesquisa: string = ''; // Adicione esta linha para armazenar o valor do campo de pesquisa
  filmes$ = this.store.select((state) => state.filme?.resultados || []);

  filmes: Filme[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>, private HomeService: HomeService ) { }

  ngOnInit(): void {
    this.store.select((state) => state.filme.resultados)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(filmes => {
        this.filmes = filmes;
      });
  }
  getFilme(event: any) {
    const filme = event.target.value;
    this.HomeService.buscarFilme(filme).subscribe(res => {
      if (res && res.Search) {
        this.filmes = res.Search;
        this.store.dispatch(FilmeActions.atualizarResultados({ resultados: res.Search }));
      } else {
        this.filmes = [];
        this.store.dispatch(FilmeActions.limparResultados());
      }
    });
  }

  reset() {
    this.filmes = []; // Limpar a lista local
    this.store.dispatch(FilmeActions.limparResultados());
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
