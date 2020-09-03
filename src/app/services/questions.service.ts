import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  //Get All questionaire List From Api(Json File)
  public getQuestionnaire(): Observable<any> {
    return this.http.get("./assets/data/questionnaire.json");
  }

}
