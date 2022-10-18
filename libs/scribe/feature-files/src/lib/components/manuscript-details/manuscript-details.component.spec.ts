import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuscriptDetailsComponent } from './manuscript-details.component';

describe('ManuscriptDetailsComponent', () => {
  let component: ManuscriptDetailsComponent;
  let fixture: ComponentFixture<ManuscriptDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManuscriptDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManuscriptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
