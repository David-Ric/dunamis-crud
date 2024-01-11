
import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, finalize, switchMap } from 'rxjs/operators';
import { EntradaService } from './../../services/entrada/entrada.service';
import { Entrada } from '../../models/interfaces/entrada/entrada';
import { EntradaPage } from '../../models/interfaces/entrada/entrada-page';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntradaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @Input() entradaToEdit: Entrada | undefined;
  @Output() entradaCreated = new EventEmitter<Entrada>();
  @Output() entradaUpdated = new EventEmitter<{ id: number, entrada: Entrada }>();
  @Output() entradaDeleted = new EventEmitter<number>();
  editEntrada: { entradaId: number; editMode: boolean } | undefined = undefined;

  entradas$: Observable<EntradaPage | undefined> = throwError({ totalItems: 0, entradas: [] });
  pageIndex = 0;
  pageSize = 10;
  readonly displayedColumns = ['placa', 'via', 'produto', 'fluxo', 'tab_Desconto', 'deposito', 'actions'];
  searchPlaca: string = '';
  errorLoadingEntradas: boolean = false;
  loading: boolean = false;
  messageError: boolean = false;
  showModal = false;
  edit = false;
  entradaIdToEdit: number | undefined = undefined;

  editMode: boolean = false;

  constructor(public entradaService: EntradaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.paginator?.page.subscribe((pageEvent: PageEvent) => {
      this.loadEntradas(pageEvent.pageIndex + 1, pageEvent.pageSize);
    });

    if (this.entradaToEdit) {
      this.onGetDetails(this.entradaToEdit.id);
    } else {
      this.loadEntradas();
    }
  }

  openModal() {
    this.showModal = true;
    this.edit = false;
    this.editEntrada = { entradaId: 0, editMode: false };
  }

  openModalEdit(id: number) {
    this.showModal = true;
     this.edit = true;
    // console.log("abriu modal",this.showModal)
     this.editEntrada = { entradaId: id, editMode: true };
  }

  loadEntradas(page = 1, pageSize = 4) {
    this.errorLoadingEntradas = false;
    this.loading = true;

    this.entradas$ = this.entradaService.getEntradas(page, pageSize, this.searchPlaca)
      .pipe(
        catchError(error => {
          console.error('Erro ao carregar entradas:', error);
          this.errorLoadingEntradas = true;
          return throwError(error);
        }),
        map(response => {
          console.log('Entradas carregadas com sucesso:', response);
          if (this.paginator) {
            this.paginator.length = response.totalItems;
            this.cdr.detectChanges();
          }
          this.pageIndex = page - 1;
          this.pageSize = pageSize;
          return response;
        }),
        finalize(() => {
          this.loading = false;
        })
      );
  }

  onSubmit() {
    if (this.entradaToEdit) {
      this.onUpdate(this.entradaToEdit.id, this.entradaToEdit);
    } else {
      this.loadEntradas();
    }
  }

  clearSearch() {
    this.searchPlaca = '';
    this.loadEntradas();
  }

  onGetDetails(id: number) {
    this.errorLoadingEntradas = false;
    this.loading = true;

    this.entradas$ = this.entradaService.getId(id)
      .pipe(
        switchMap(entrada => {
          console.log('Detalhes da Entrada:', entrada);
          return of({ totalItems: 1, entradas: [entrada] } as EntradaPage);
        }),
        catchError(error => {
          console.error(`Erro ao obter detalhes da entrada com ID ${id}:`, error);
          this.errorLoadingEntradas = true;
          return throwError(error);
        }),
        finalize(() => {
          this.loading = false;
        })
      );
  }

  onCreate(entrada: Entrada) {
    this.errorLoadingEntradas = false;
    this.loading = true;

    this.entradaService.postEntrada(entrada)
      .pipe(
        catchError(error => {
          console.error('Erro ao criar entrada:', error);
          this.errorLoadingEntradas = true;
          return throwError(error);
        }),
        finalize(() => {
          this.loading = false;
          this.loadEntradas();
        })
      )
      .subscribe(response => {
        if (typeof response === 'string') {
          this.entradaCreated.emit(entrada);
        } else {
          this.entradaCreated.emit(response);
        }
      });
  }

  onUpdate(id: number, entrada: Entrada) {
    this.errorLoadingEntradas = false;
    this.loading = true;

    this.entradaService.putEntrada(id, entrada)
      .pipe(
        catchError(error => {
          console.error(`Erro ao atualizar entrada com ID ${id}:`, error);
          this.errorLoadingEntradas = true;
          return throwError(error);
        }),
        finalize(() => {
          this.loading = false;
          this.loadEntradas();
        })
      )
      .subscribe(response => {
        if (typeof response === 'string') {
          this.entradaUpdated.emit({ id, entrada });
        } else {
          this.entradaUpdated.emit(response);
        }
      });
  }

  onDelete(id: number) {
    this.errorLoadingEntradas = false;
    this.loading = true;

    this.entradaService.deleteEntrada(id)
      .pipe(
        catchError(error => {
          console.error(`Erro ao excluir entrada com ID ${id}:`, error);
          this.errorLoadingEntradas = true;
          return throwError(error);
        }),
        finalize(() => {
          this.loading = false;
          this.loadEntradas();
        })
      )
      .subscribe(() => {
        this.entradaDeleted.emit(id);
      });
  }
}
