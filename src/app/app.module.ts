import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from './material/material.module';

import {StatsComponent} from './stats/stats.component';
import {AppRoutingModule} from './app-routing.module';
import {MainComponent} from './main/main.component';
import {RestService} from './rest.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent,
        StatsComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [RestService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
