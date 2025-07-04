import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileEmployerComponent } from './file-employer.component';

describe('FileEmployerComponent', () => {
  let component: FileEmployerComponent;
  let fixture: ComponentFixture<FileEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileEmployerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
