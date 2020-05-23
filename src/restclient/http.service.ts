import {Injectable} from '@angular/core';
import {Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from '@angular/http';
import {Observable} from 'rxjs';
import * as SecureLS from 'secure-ls';

@Injectable()
export class HttpService extends Http {

  localStorageCriptografada = new SecureLS();

  static httpBuilder(backend: XHRBackend, options: RequestOptions) {
    return new HttpService(backend, options);
  }

  constructor(backend: XHRBackend, options: RequestOptions) {
    super(backend, options);
    const token = this.localStorageCriptografada.get('token');
    options.headers.set('Authorization', token);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const token = this.localStorageCriptografada.get('token');
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', token);
    } else {
      // we have to add the token to the url object
      url.headers.set('Authorization', token);
    }
    return super.request(url, options);
  }

}
