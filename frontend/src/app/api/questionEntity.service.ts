/**
 * H2MS API
 * API for interacting with the H2MS backend.
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';

import { Observable }                                        from 'rxjs/Observable';
import '../rxjs-operators';

import { Question } from '../model/question';
import { ResourceEventTemplate } from '../model/resourceEventTemplate';
import { ResourceQuestion } from '../model/resourceQuestion';
import { ResourcesQuestion } from '../model/resourcesQuestion';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';
import {Config} from '../config/config';
import {ConfigService} from '../config/config.service';


@Injectable()
export class QuestionEntityService {

    protected basePath = 'https://test.h2ms.org:81';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    config: Config;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration,
                @Optional() configService: ConfigService) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }

        this.config = configService.getConfig();
        const baseURL = this.config.backendURL,
            port = this.config.backendPort;
        if (baseURL && port) {
            this.basePath = baseURL.concat(':').concat(String(port));
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * deleteQuestion
     *
     * @param id id
     */
    public deleteQuestionUsingDELETE(id: number): Observable<{}> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteQuestionUsingDELETE.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        let httpHeaderAcceptSelected: string = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/questions/${encodeURIComponent(String(id))}`,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * findAllQuestion
     *
     * @param page page
     * @param size size
     * @param sort sort
     */
    public findAllQuestionUsingGET(page?: string, size?: string, sort?: string): Observable<ResourcesQuestion> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (size !== undefined) {
            queryParameters = queryParameters.set('size', <any>size);
        }
        if (sort !== undefined) {
            queryParameters = queryParameters.set('sort', <any>sort);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/hal+json',
            'text/uri-list',
            'application/x-spring-data-compact+json'
        ];
        let httpHeaderAcceptSelected: string = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/questions`,
            {
                params: queryParameters,
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * findOneQuestion
     *
     * @param id id
     */
    public findOneQuestionUsingGET(id: number): Observable<ResourceQuestion> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling findOneQuestionUsingGET.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        let httpHeaderAcceptSelected: string = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/questions/${encodeURIComponent(String(id))}`,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * questionEventTemplate
     *
     * @param id id
     */
    public questionEventTemplateUsingDELETE(id: number): Observable<{}> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling questionEventTemplateUsingDELETE.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        let httpHeaderAcceptSelected: string = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'text/uri-list',
            'application/x-spring-data-compact+json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/questions/${encodeURIComponent(String(id))}/eventTemplate`,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * questionEventTemplate
     *
     * @param id id
     */
    public questionEventTemplateUsingGET(id: number): Observable<ResourceEventTemplate> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling questionEventTemplateUsingGET.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/hal+json'
        ];
        let httpHeaderAcceptSelected: string = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/questions/${encodeURIComponent(String(id))}/eventTemplate`,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * questionEventTemplate
     *
     * @param id id
     * @param body body
     */
    public questionEventTemplateUsingPATCH(id: number, body: string): Observable<ResourceEventTemplate> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling questionEventTemplateUsingPATCH.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling questionEventTemplateUsingPATCH.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        let httpHeaderAcceptSelected: string = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'text/uri-list',
            'application/x-spring-data-compact+json'
        ];
        let httpContentTypeSelected:string = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.patch<any>(`${this.basePath}/questions/${encodeURIComponent(String(id))}/eventTemplate`,
            body,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * questionEventTemplate
     *
     * @param id id
     * @param body body
     */
    public questionEventTemplateUsingPOST(id: number, body: string): Observable<ResourceEventTemplate> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling questionEventTemplateUsingPOST.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling questionEventTemplateUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        let httpHeaderAcceptSelected: string = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'text/uri-list',
            'application/x-spring-data-compact+json'
        ];
        let httpContentTypeSelected:string = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/questions/${encodeURIComponent(String(id))}/eventTemplate`,
            body,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * questionEventTemplate
     *
     * @param id id
     * @param body body
     */
    public questionEventTemplateUsingPUT(id: number, body: string): Observable<ResourceEventTemplate> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling questionEventTemplateUsingPUT.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling questionEventTemplateUsingPUT.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        let httpHeaderAcceptSelected: string = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'text/uri-list',
            'application/x-spring-data-compact+json'
        ];
        let httpContentTypeSelected:string = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/questions/${encodeURIComponent(String(id))}/eventTemplate`,
            body,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * saveQuestion
     *
     * @param id id
     * @param body body
     */
    public saveQuestionUsingPATCH(id: number, body: Question): Observable<ResourceQuestion> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling saveQuestionUsingPATCH.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling saveQuestionUsingPATCH.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        let httpHeaderAcceptSelected: string = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.patch<any>(`${this.basePath}/questions/${encodeURIComponent(String(id))}`,
            body,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * saveQuestion
     *
     * @param body body
     */
    public saveQuestionUsingPOST(body: Question): Observable<ResourceQuestion> {
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling saveQuestionUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        let httpHeaderAcceptSelected: string = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/questions`,
            body,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

    /**
     * saveQuestion
     *
     * @param id id
     * @param body body
     */
    public saveQuestionUsingPUT(id: number, body: Question): Observable<ResourceQuestion> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling saveQuestionUsingPUT.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling saveQuestionUsingPUT.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        let httpHeaderAcceptSelected: string = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/questions/${encodeURIComponent(String(id))}`,
            body,
            {
                headers: headers,
                withCredentials: this.configuration.withCredentials,
            }
        );
    }

}
