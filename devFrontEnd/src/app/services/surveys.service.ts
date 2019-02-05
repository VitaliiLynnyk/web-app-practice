import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class SurveysService {

    constructor(private http: HttpClient) {
    }

    static createHeaderToken() {
        return new HttpHeaders().set('token', localStorage.getItem('tokenSession'));
    }

    getSurveysList() {
        return this.http.get(
            'https://web-app-practice.herokuapp.com/api/surveys',
            {headers: SurveysService.createHeaderToken()}
        );
    }

    getSurveyInfo(idSurvey) {
        const parameters = new HttpParams().set('survey_id', idSurvey.toString());
        return this.http.get(
            'https://web-app-practice.herokuapp.com/api/questionPersonAnswers',
            {
                headers: SurveysService.createHeaderToken(),
                params: parameters
            }
        );
    }

    getSurveyDegrees() {
        return this.http.get(
            'https://web-app-practice.herokuapp.com/api/getDegrees',
            {headers: SurveysService.createHeaderToken()}
        );
    }

    postCreateNewSurvey(createNewSurveyData: any) {
        return this.http.post(
            'https://web-app-practice.herokuapp.com/api/surveys',
            {
                person_id: createNewSurveyData.personId,
                degree_id: createNewSurveyData.degreeId},
            {headers: SurveysService.createHeaderToken()}
        );
    }
}
