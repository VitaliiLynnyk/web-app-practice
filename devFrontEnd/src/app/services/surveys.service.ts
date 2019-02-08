import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AnswerItemForSend} from '../interfaces/interfaces-list';

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

    getSurveyQuestionsForPass(token: string) {
        const parameters = new HttpParams().set('random_url', token);
        return this.http.get(
            'https://web-app-practice.herokuapp.com/api/surveyQuestions',
            {params: parameters}
        );
    }

    getSurveyStatistic() {
        return this.http.get(
            'https://web-app-practice.herokuapp.com/api/statistics',
            {headers: SurveysService.createHeaderToken()}
        );
    }

    postCreateNewSurvey(createNewSurveyData: any) {
        return this.http.post(
            'https://web-app-practice.herokuapp.com/api/surveys',
            {
                person_id: createNewSurveyData.personId,
                degree_id: createNewSurveyData.degreeId
            },
            {headers: SurveysService.createHeaderToken()}
        );
    }

    postSendAnswerSurvey(data: Array<AnswerItemForSend>) {
        return this.http.post(
            'https://web-app-practice.herokuapp.com/api/questionPersonAnswers',
            {
                answers: data
            }
        );
    }
}
