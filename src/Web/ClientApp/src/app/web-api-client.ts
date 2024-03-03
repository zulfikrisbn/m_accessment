//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.0.3.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IFreelancersClient {
    getFreelancersWithPagination(pageNumber: number, pageSize: number): Observable<PaginatedListOfFreelancerDto>;
    getFreelance(id: number): Observable<FreelancerDto>;
    createFreelancer(command: CreateFreelancerCommand): Observable<boolean>;
    updateFreelancer(command: UpdateFreelancerCommand): Observable<void>;
    checkUsername(command: CheckUsernameCommand): Observable<boolean>;
    deleteFreelancer(id: number): Observable<void>;
}

@Injectable({
    providedIn: 'root'
})
export class FreelancersClient implements IFreelancersClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ?? "";
    }

    getFreelancersWithPagination(pageNumber: number, pageSize: number): Observable<PaginatedListOfFreelancerDto> {
        let url_ = this.baseUrl + "/api/Freelancers/GetFreelancersWithPagination?";
        if (pageNumber === undefined || pageNumber === null)
            throw new Error("The parameter 'pageNumber' must be defined and cannot be null.");
        else
            url_ += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";
        if (pageSize === undefined || pageSize === null)
            throw new Error("The parameter 'pageSize' must be defined and cannot be null.");
        else
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetFreelancersWithPagination(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetFreelancersWithPagination(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PaginatedListOfFreelancerDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<PaginatedListOfFreelancerDto>;
        }));
    }

    protected processGetFreelancersWithPagination(response: HttpResponseBase): Observable<PaginatedListOfFreelancerDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = PaginatedListOfFreelancerDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    getFreelance(id: number): Observable<FreelancerDto> {
        let url_ = this.baseUrl + "/api/Freelancers/GetFreelance?";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined and cannot be null.");
        else
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetFreelance(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetFreelance(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<FreelancerDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<FreelancerDto>;
        }));
    }

    protected processGetFreelance(response: HttpResponseBase): Observable<FreelancerDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = FreelancerDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    createFreelancer(command: CreateFreelancerCommand): Observable<boolean> {
        let url_ = this.baseUrl + "/api/Freelancers/CreateFreelancer";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreateFreelancer(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateFreelancer(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<boolean>;
                }
            } else
                return _observableThrow(response_) as any as Observable<boolean>;
        }));
    }

    protected processCreateFreelancer(response: HttpResponseBase): Observable<boolean> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    updateFreelancer(command: UpdateFreelancerCommand): Observable<void> {
        let url_ = this.baseUrl + "/api/Freelancers/UpdateFreelancer";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdateFreelancer(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdateFreelancer(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else
                return _observableThrow(response_) as any as Observable<void>;
        }));
    }

    protected processUpdateFreelancer(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    checkUsername(command: CheckUsernameCommand): Observable<boolean> {
        let url_ = this.baseUrl + "/api/Freelancers/CheckUsername";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCheckUsername(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCheckUsername(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<boolean>;
                }
            } else
                return _observableThrow(response_) as any as Observable<boolean>;
        }));
    }

    protected processCheckUsername(response: HttpResponseBase): Observable<boolean> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    deleteFreelancer(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/Freelancers/DeleteFreelancer?";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined and cannot be null.");
        else
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeleteFreelancer(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteFreelancer(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else
                return _observableThrow(response_) as any as Observable<void>;
        }));
    }

    protected processDeleteFreelancer(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export class PaginatedListOfFreelancerDto implements IPaginatedListOfFreelancerDto {
    items?: FreelancerDto[];
    pageNumber?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;

    constructor(data?: IPaginatedListOfFreelancerDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(FreelancerDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            this.hasPreviousPage = _data["hasPreviousPage"];
            this.hasNextPage = _data["hasNextPage"];
        }
    }

    static fromJS(data: any): PaginatedListOfFreelancerDto {
        data = typeof data === 'object' ? data : {};
        let result = new PaginatedListOfFreelancerDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        data["pageNumber"] = this.pageNumber;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export interface IPaginatedListOfFreelancerDto {
    items?: FreelancerDto[];
    pageNumber?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}

export class FreelancerDto implements IFreelancerDto {
    id?: number;
    username?: string | undefined;
    email?: string | undefined;
    phoneNo?: string | undefined;
    skillSets?: string[];
    hobby?: string | undefined;

    constructor(data?: IFreelancerDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.username = _data["username"];
            this.email = _data["email"];
            this.phoneNo = _data["phoneNo"];
            if (Array.isArray(_data["skillSets"])) {
                this.skillSets = [] as any;
                for (let item of _data["skillSets"])
                    this.skillSets!.push(item);
            }
            this.hobby = _data["hobby"];
        }
    }

    static fromJS(data: any): FreelancerDto {
        data = typeof data === 'object' ? data : {};
        let result = new FreelancerDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["username"] = this.username;
        data["email"] = this.email;
        data["phoneNo"] = this.phoneNo;
        if (Array.isArray(this.skillSets)) {
            data["skillSets"] = [];
            for (let item of this.skillSets)
                data["skillSets"].push(item);
        }
        data["hobby"] = this.hobby;
        return data;
    }
}

export interface IFreelancerDto {
    id?: number;
    username?: string | undefined;
    email?: string | undefined;
    phoneNo?: string | undefined;
    skillSets?: string[];
    hobby?: string | undefined;
}

export class CreateFreelancerCommand implements ICreateFreelancerCommand {
    username?: string | undefined;
    email?: string | undefined;
    phoneNo?: string | undefined;
    skillSets?: string[];
    hobby?: string | undefined;

    constructor(data?: ICreateFreelancerCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.username = _data["username"];
            this.email = _data["email"];
            this.phoneNo = _data["phoneNo"];
            if (Array.isArray(_data["skillSets"])) {
                this.skillSets = [] as any;
                for (let item of _data["skillSets"])
                    this.skillSets!.push(item);
            }
            this.hobby = _data["hobby"];
        }
    }

    static fromJS(data: any): CreateFreelancerCommand {
        data = typeof data === 'object' ? data : {};
        let result = new CreateFreelancerCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["username"] = this.username;
        data["email"] = this.email;
        data["phoneNo"] = this.phoneNo;
        if (Array.isArray(this.skillSets)) {
            data["skillSets"] = [];
            for (let item of this.skillSets)
                data["skillSets"].push(item);
        }
        data["hobby"] = this.hobby;
        return data;
    }
}

export interface ICreateFreelancerCommand {
    username?: string | undefined;
    email?: string | undefined;
    phoneNo?: string | undefined;
    skillSets?: string[];
    hobby?: string | undefined;
}

export class UpdateFreelancerCommand implements IUpdateFreelancerCommand {
    id?: number;
    username?: string | undefined;
    email?: string | undefined;
    phoneNo?: string | undefined;
    skillSets?: string[];
    hobby?: string | undefined;

    constructor(data?: IUpdateFreelancerCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.username = _data["username"];
            this.email = _data["email"];
            this.phoneNo = _data["phoneNo"];
            if (Array.isArray(_data["skillSets"])) {
                this.skillSets = [] as any;
                for (let item of _data["skillSets"])
                    this.skillSets!.push(item);
            }
            this.hobby = _data["hobby"];
        }
    }

    static fromJS(data: any): UpdateFreelancerCommand {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateFreelancerCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["username"] = this.username;
        data["email"] = this.email;
        data["phoneNo"] = this.phoneNo;
        if (Array.isArray(this.skillSets)) {
            data["skillSets"] = [];
            for (let item of this.skillSets)
                data["skillSets"].push(item);
        }
        data["hobby"] = this.hobby;
        return data;
    }
}

export interface IUpdateFreelancerCommand {
    id?: number;
    username?: string | undefined;
    email?: string | undefined;
    phoneNo?: string | undefined;
    skillSets?: string[];
    hobby?: string | undefined;
}

export class CheckUsernameCommand implements ICheckUsernameCommand {
    username?: string | undefined;

    constructor(data?: ICheckUsernameCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.username = _data["username"];
        }
    }

    static fromJS(data: any): CheckUsernameCommand {
        data = typeof data === 'object' ? data : {};
        let result = new CheckUsernameCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["username"] = this.username;
        return data;
    }
}

export interface ICheckUsernameCommand {
    username?: string | undefined;
}

export class SwaggerException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}