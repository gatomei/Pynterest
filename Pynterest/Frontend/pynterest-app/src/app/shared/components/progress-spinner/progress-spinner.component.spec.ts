import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressSpinnerComponent as ProgressSpinnerComponent } from './progress-spinner.component';

describe('ProgressBarComponent', () => {
  let component: ProgressSpinnerComponent;
  let fixture: ComponentFixture<ProgressSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
