import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSayaraComponent } from './credit-sayara.component';

describe('CreditSayaraComponent', () => {
  let component: CreditSayaraComponent;
  let fixture: ComponentFixture<CreditSayaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditSayaraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditSayaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
