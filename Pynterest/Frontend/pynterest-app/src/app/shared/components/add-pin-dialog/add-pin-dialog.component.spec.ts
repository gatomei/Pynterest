import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPinDialogComponent } from './add-pin-dialog.component';

describe('AddPinDialogComponent', () => {
  let component: AddPinDialogComponent;
  let fixture: ComponentFixture<AddPinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPinDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
