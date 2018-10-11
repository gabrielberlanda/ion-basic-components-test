import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ImageProvider {
    constructor(public http: HttpClient) {}

    async loadImages(): Promise<any> {
        return this.http.get('http://www.splashbase.co/api/v1/images/latest').toPromise();
    }
}


