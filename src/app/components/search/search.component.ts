import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  template: `
  <div class="search">
    <input class="search__input" placeholder="Ciudad..." [formControl]="inputSearch" />
  </div>
  `,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  inputSearch = new FormControl('');
  @Output() submitted = new EventEmitter<string>();


  ngOnInit(): void {
    this.onChange();
  }

  //Funcion que escuchara los cambios en el input
  private onChange(): void{
    this.inputSearch.valueChanges
    //Utilizare operadores de rxjs
    .pipe(
      map( (search: string) => search.trim() ),
      debounceTime(850),//emite valor despues del tiempo estipulado
      distinctUntilChanged(),//Emite el valor, pero no un valor que ya ha emitido
      filter( (search: string) => search !== ''),
      tap( (search: string) => this.submitted.emit(search))//se encargara de enviar esto al componente padre quien será el encargado de buscar
    )
    .subscribe()
  }

}
