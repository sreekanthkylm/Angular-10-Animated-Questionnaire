import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuestionsComponent } from './questions.component';
import { QuestionsService } from "../../services/questions.service";
import { of } from 'rxjs';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;
  let service: QuestionsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(QuestionsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe Questionnaire api and produce questionnaireList and add answer field', () => {
    spyOn(service, 'getQuestionnaire').and.returnValue(of({
      "questionnaire": {
        "id": 40,
        "identifier": "ewBzTS",
        "name": "Privathaftpflichtversicherung",
        "questions": [
          {
            "question_type": "multiple-choice",
            "identifier": "list_12110962",
            "headline": "Wen möchtest Du versichern?",
            "description": null,
            "required": false,
            "multiple": "false",
            "choices": [
              {
                "label": "Meine Familie mit Kindern",
                "value": "Meine Familie mit Kindern",
                "selected": false
              },
              {
                "label": "Meine Familie ohne Kinder",
                "value": "Meine Familie ohne Kinder",
                "selected": false
              },
              {
                "label": "Mich ohne Kind",
                "value": "Mich ohne Kind",
                "selected": false
              },
              {
                "label": "Mich mit Kind",
                "value": "Mich mit Kind",
                "selected": false
              },
              {
                "label": "Mich und meinen Lebenspartner",
                "value": "Mich und meinen Lebenspartner",
                "selected": false
              }
            ],
            "jumps": []
          },
          {
            "question_type": "text",
            "identifier": "date_22039590",
            "headline": "Was wäre Dein Wunschtermin für den Beginn der Privathaftpflichtversicherung?",
            "description": null,
            "required": false,
            "multiline": "false",
            "jumps": []
          }]
      }
    }));
    component.susbcribeQuestionnaire();
    expect(component.questionnaireList).toEqual(
      {
        "id": 40,
        "identifier": "ewBzTS",
        "name": "Privathaftpflichtversicherung",
        "questions": [
          {
            "answer": "",
            "question_type": "multiple-choice",
            "identifier": "list_12110962",
            "headline": "Wen möchtest Du versichern?",
            "description": null,
            "required": false,
            "multiple": "false",
            "choices": [
              {
                "label": "Meine Familie mit Kindern",
                "value": "Meine Familie mit Kindern",
                "selected": false
              },
              {
                "label": "Meine Familie ohne Kinder",
                "value": "Meine Familie ohne Kinder",
                "selected": false
              },
              {
                "label": "Mich ohne Kind",
                "value": "Mich ohne Kind",
                "selected": false
              },
              {
                "label": "Mich mit Kind",
                "value": "Mich mit Kind",
                "selected": false
              },
              {
                "label": "Mich und meinen Lebenspartner",
                "value": "Mich und meinen Lebenspartner",
                "selected": false
              }
            ],
            "jumps": []
          }, {
            "answer": "",
            "question_type": "text",
            "identifier": "date_22039590",
            "headline": "Was wäre Dein Wunschtermin für den Beginn der Privathaftpflichtversicherung?",
            "description": null,
            "required": false,
            "multiline": "false",
            "jumps": []
          }]
      }
    );
  });

  it('should show next index item and hide current index item when click next button', () => {
    let index = 3;
    component.showStep = ["false", "false", "false", "false", "false"];
    component.onNext(index);
    expect(component.showStep[index]).toEqual(false);
    expect(component.showStep[index + 1]).toEqual(true);
  });

  it('should show previous index item and hide current index item when click back button', () => {
    let index = 3;
    component.showStep = ["false", "false", "false", "false", "false"];
    component.onBack(index);
    expect(component.showStep[index]).toEqual(false);
    expect(component.showStep[index - 1]).toEqual(true);
  });

  it('should update progress if question answer is selected or typed', () => {
    let index = 0;
    let value = "ja";
    component.showStep = ["false"];
    component.updateProgress(index, value);
    expect(component.stepCompleted).toEqual([true]);
    expect(component.progress).toEqual(100);
  });

  it('should show finished message when click on finish', () => {
    component.onFinish();
    expect(component.taskCompleted).toEqual(true);
  });

  it('should not update progress if the input is empty string', () => {
    let index = 0;
    let value = "";
    component.showStep = ["false"];
    component.updateProgress(index, value);
    expect(component.stepCompleted).toEqual([null]);
    expect(component.progress).toEqual(0);
  });

});
