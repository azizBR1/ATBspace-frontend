import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthvalideComponent } from './google-authvalide.component';

describe('GoogleAuthvalideComponent', () => {
  let component: GoogleAuthvalideComponent;
  let fixture: ComponentFixture<GoogleAuthvalideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAuthvalideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleAuthvalideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
