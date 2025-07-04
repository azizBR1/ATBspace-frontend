import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditTahawelComponent } from './credit-tahawel.component';

describe('CreditTahawelComponent', () => {
  let component: CreditTahawelComponent;
  let fixture: ComponentFixture<CreditTahawelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditTahawelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditTahawelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
