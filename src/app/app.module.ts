import bugsnag from '@bugsnag/js';
import { BugsnagErrorHandler } from '@bugsnag/plugin-angular';
import { NgModule, ErrorHandler } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {HttpService} from '../restclient/http.service';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule, HttpRequest, HttpXhrBackend} from '@angular/common/http';
import {DropdownModule} from 'ngx-dropdown';
import {AdminModule} from './admin/admin.module';
import {GaugeChartModule} from 'angular-gauge-chart';
import {ChartsModule} from 'ng2-charts';
import {GuardsModule} from './guards/guards.module';

// configure Bugsnag asap
const bugsnagClient = bugsnag('617bb71a730d109ee106850050e7288d');

// create a factory which will return the bugsnag error handler
export function errorHandlerFactory() {
  return new BugsnagErrorHandler(bugsnagClient);
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        GuardsModule,
        GaugeChartModule,
        DropdownModule,
        AdminModule,
        ChartsModule
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        {
            provide: HttpService,
            useFactory: HttpService.httpBuilder,
            deps: [HttpXhrBackend, HttpRequest]
        },
        {provide: ErrorHandler, useFactory: errorHandlerFactory}
        ],
    bootstrap: [AppComponent]
})
export class AppModule {}

