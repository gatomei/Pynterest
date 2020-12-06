import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToBoardFormComponent } from './add-to-board-form.component';

describe('AddToBoardFormComponent', () => {
  let component: AddToBoardFormComponent;
  let fixture: ComponentFixture<AddToBoardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToBoardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToBoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
