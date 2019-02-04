import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class SurveysService {

    private idSurvey: number;

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

    getSurveyInfo() {
        const params = new HttpParams().set('survey_id', this.idSurvey.toString());
        return this.http.get(
            'https://web-app-practice.herokuapp.com/api/questionPersonAnswers',
            {
                headers: SurveysService.createHeaderToken(),
                params: params
            }
        );
    }

    getSurveyDegrees() {
        return this.http.get(
            'https://web-app-practice.herokuapp.com/api/getDegrees',
            {headers: SurveysService.createHeaderToken()}
        );
    }

    setIdSurvey(temp: number) {
        this.idSurvey = temp;
    }

    getIdSurvey() {
        return this.idSurvey;
    }
}
