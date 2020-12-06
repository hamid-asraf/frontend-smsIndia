import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SaveDataComponent } from './components/save-data/save-data.component';
import { ArraySortPipe } from './pipesanddirectives/sortpipe.pipe';
import { SearchPipe } from './pipesanddirectives/search.pipe';

@NgModule({
  declarations: [
    ArraySortPipe,
    SearchPipe,
    AppComponent,
    HomeComponent,
    SaveDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
