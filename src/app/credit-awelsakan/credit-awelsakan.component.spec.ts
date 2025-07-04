import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAwelsakanComponent } from './credit-awelsakan.component';

describe('CreditAwelsakanComponent', () => {
  let component: CreditAwelsakanComponent;
  let fixture: ComponentFixture<CreditAwelsakanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditAwelsakanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditAwelsakanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
