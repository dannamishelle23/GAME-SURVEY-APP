import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewSurveyPage } from './new-survey.page';

describe('NewSurveyPage', () => {
  let component: NewSurveyPage;
  let fixture: ComponentFixture<NewSurveyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
