import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestUtilisateursComponent } from './gest-utilisateurs.component';

describe('GestUtilisateursComponent', () => {
  let component: GestUtilisateursComponent;
  let fixture: ComponentFixture<GestUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestUtilisateursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
