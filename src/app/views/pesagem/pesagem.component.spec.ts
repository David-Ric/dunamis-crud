import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesagemComponent } from './pesagem.component';

describe('PesagemComponent', () => {
  let component: PesagemComponent;
  let fixture: ComponentFixture<PesagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PesagemComponent]
    });
    fixture = TestBed.createComponent(PesagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
