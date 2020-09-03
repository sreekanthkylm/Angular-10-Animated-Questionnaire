import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QuestionsService } from "../../services/questions.service";
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('600ms ease-in', keyframes([
          style({ opacity: 0.5, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: .5, transform: 'translateX(35px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 }),
        ]))
      ]),
      transition(':leave', [
        animate('600ms ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('50ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),
        query(':leave', stagger('50ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ]),
    trigger('explainerAnim', [
      transition('* => *', [
        query('.mat-raised-button', style({ opacity: 0, transform: 'translateX(-40px)' })),
        query('.mat-raised-button', stagger('300ms', [
          animate('400ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),
        query('.mat-raised-button', [
          animate(1000, style('*'))
        ])
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class QuestionsComponent implements OnInit {

  showStep = [];
  stepCompleted = [];
  progress: number = 0;
  questionnaireList: any;
  favoriteSeason: string;
  taskCompleted: boolean = false;

  constructor(private questionsService: QuestionsService,) { }

  ngOnInit(): void {
    this.susbcribeQuestionnaire();
  }

  // Subscribe Questionnaire Api 
  susbcribeQuestionnaire() {
    this.questionsService.getQuestionnaire().pipe(map(results => {
      results.questionnaire.questions.map(v => {
        v.answer = '';
      })
      return results;
    })).subscribe(results => {
      this.questionnaireList = results.questionnaire;
      this.createDynamicFormControls(this.questionnaireList.questions);
    });
  }

  // Create Default selected items of questions array first element as true and others as false 
  createDynamicFormControls(questions) {
    this.showStep[0] = true;
    for (let i = 1; i < questions.length; i++) {
      this.showStep[i] = false;
    }
  }

  // Click Next- Show Next item Hide Current Item
  onNext(index) {
    if (index + 1 < this.showStep.length) {
      this.showStep[index] = false;
      this.showStep[index + 1] = true;
    }
  }

  // Click Back- Show previous item Hide Current Item
  onBack(index) {
    this.showStep[index] = false;
    this.showStep[index - 1] = true;
  }

  // Questionnaire Progress Updation
  updateProgress(index, value) {
    if (value.trim().length > 0) {
      this.stepCompleted[index] = true;
    }
    else {
      this.stepCompleted[index] = null;
    }
    let compltedItems = this.stepCompleted.filter(Boolean).length;
    this.progress = Math.ceil(((compltedItems) / this.showStep.length) * 100);
  }

  // Click - Finish Questionnaire
  onFinish() {
    this.taskCompleted = true;
  }

}
