import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Entrada } from '../../../../models/interfaces/entrada/entrada';
import { EntradaService } from '../../../../services/entrada/entrada.service';
import { catchError, finalize, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-entrada-form',
  templateUrl: './entrada-form.component.html',
  styleUrls: ['./entrada-form.component.scss']
})
export class EntradaFormComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() entradaCreated = new EventEmitter<Entrada>();
  @Output() entradaUpdated = new EventEmitter<{ id: number, entrada: Entrada }>();
  @Input() editEntrada: { entradaId: number; editMode: boolean } | undefined;
  dados = [
    { clifor: 'Cliente 1', cpf_cnpj: '123.456.789-01', endereco: 'Rua A, 123', nf: '001', serie: 'A', valor: 100.00 },

  ];


  readonly displayedColumnsForm = ['clifor', 'cpf_cnpj', 'endereco', 'nf', 'serie', 'valor', 'actions'];
  entradaForm: FormGroup;
  loading: boolean = false;
  selectControl = new FormControl();

  inputControl = new FormControl();
  form: FormGroup = new FormGroup({
    tab_Desconto: new FormControl('ree')
  });


  onDepositoSelectChange(event: any) {
    const selectedValue = event.target.value;
    this.form.get('desconto')?.setValue(selectedValue);
  }
  onDescontoSelectChange() {
    const selectedValue = this.form.get('tab_Desconto')?.value;
    this.form.get('tab_Desconto')?.setValue(selectedValue);
  }
  constructor(private fb: FormBuilder, private entradaService: EntradaService) {
    this.entradaForm = this.fb.group({
      placa: ['', Validators.required],
      via: [''],
      produto: [''],
      fluxo: [''],
      tab_Desconto: [0],
      deposito: [0],
      transportador: [0],
      endereco: [''],
      doc_Frete: [''],
      cif: [false],
      fob: [false],
      motorista: [''],
      observacao: [''],
    });
  }

  messageError = false;
  message = '';

  ngOnInit(): void {
    this.inputControl.disable();
    console.log("editar?", this.editEntrada?.editMode);

    if (this.editEntrada && this.entradaForm) {
      if (this.editEntrada.editMode) {
        this.onGetDetails(this.editEntrada.entradaId);
      } else {
        this.entradaForm.patchValue({
          placa: '',
          via: '',
          produto: '',
          fluxo: '',
          tab_Desconto: 0,
          deposito: 0,
          transportador: 0,
          endereco: '',
          doc_Frete: '',
          cif: false,
          fob: false,
          motorista: '',
          observacao: '',
        });
      }
    }
    this.selectControl.valueChanges.subscribe(value => {

      this.inputControl.setValue(value);
      this.inputControl.setValue(this.selectControl.value);

    //  this.inputControl.disable();
    });
  }

  onGetDetails(id: number) {
    this.loading = true;
    this.entradaService.getId(id)
      .pipe(
        switchMap(entrada => {
          console.log('Detalhes da Entrada no Formulário:', entrada);
          this.populateForm(entrada);
          return of(entrada);
        }),
        catchError(error => {
          console.error(`Erro ao obter detalhes da entrada com ID ${id} no Formulário:`, error);
          return of(error);
        }),
        finalize(() => {
          this.loading = false;
       //   this.closeModal.emit();
        })
      )
      .subscribe();
  }

  cpfFormat(value: string): string {
    if (!value) {
      return '';
    }

    return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
  }

  phoneFormat(value: string): string {
    if (!value) {
      return '';
    }

    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  }

  populateForm(entrada: Entrada) {
    this.entradaForm.patchValue({
      placa: entrada.placa,
      via: entrada.via,
      produto: entrada.produto,
      fluxo: entrada.fluxo,
      tab_Desconto: entrada.tab_Desconto,
      deposito: entrada.deposito,
      transportador: entrada.transportador,
      endereco: entrada.endereco,
      doc_Frete: entrada.doc_Frete,
      cif: entrada.cif,
      fob: entrada.fob,
      motorista: entrada.motorista,
      observacao: entrada.observacao,
    });
  }

  onCreate() {
    if (this.editEntrada?.editMode) {
      this.onUpdate();
    } else {
      this.onSave();
    }
  }

  onSave() {
    if (this.entradaForm.invalid) {
      this.messageError = true;
      this.message = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    const newEntrada: Entrada = this.getValuesWithoutMasks();
    this.entradaCreated.emit(newEntrada);
    this.closeModal.emit();
  }

  onUpdate() {
    if (this.editEntrada && this.editEntrada.entradaId !== undefined && this.editEntrada.editMode && this.entradaForm.valid) {
      const newEntrada: Entrada = this.getValuesWithoutMasksEdit();
      this.entradaUpdated.emit({ id: this.editEntrada.entradaId, entrada: newEntrada });
      this.closeModal.emit();
    } else {
      this.messageError = true;
      this.message = 'Por favor, preencha todos os campos obrigatórios.';
    }
  }

  finishError() {
    this.messageError = false;
    this.message = '';
  }

  onCancel() {
    this.entradaForm.reset();
    this.closeModal.emit();
  }

  getValuesWithoutMasks(): Entrada {
    const formValues = this.entradaForm.value;

    const entradaWithoutMasks: Entrada = {
      id: formValues.id,
      placa: formValues.placa,
      via: formValues.via,
      produto: formValues.produto,
      fluxo: formValues.fluxo,
      tab_Desconto: formValues.tab_Desconto,
      deposito: formValues.deposito,
      transportador: formValues.transportador,
      endereco: formValues.endereco,
      doc_Frete: formValues.doc_Frete,
      cif: formValues.cif,
      fob: formValues.fob,
      motorista: formValues.motorista,
      observacao: formValues.observacao,
    };

    return entradaWithoutMasks;
  }

  getValuesWithoutMasksEdit(): Entrada {
    const formValues = this.entradaForm.value;

    const entradaWithoutMasks: Entrada = {
      id: this.editEntrada?.entradaId || 0,
      placa: formValues.placa,
      via: formValues.via,
      produto: formValues.produto,
      fluxo: formValues.fluxo,
      tab_Desconto: formValues.tab_Desconto,
      deposito: formValues.deposito,
      transportador: formValues.transportador,
      endereco: formValues.endereco,
      doc_Frete: formValues.doc_Frete,
      cif: formValues.cif,
      fob: formValues.fob,
      motorista: formValues.motorista,
      observacao: formValues.observacao,
    };

    return entradaWithoutMasks;
  }

  removeCpfMask(value: string): string {
    return value.replace(/\D/g, '');
  }

  removePhoneMask(value: string): string {
    return value.replace(/\D/g, '');
  }
}

