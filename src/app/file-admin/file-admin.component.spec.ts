import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAdminComponent } from './file-admin.component';

describe('FileAdminComponent', () => {
  let component: FileAdminComponent;
  let fixture: ComponentFixture<FileAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
