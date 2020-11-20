import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // Módulo para forms front
import { HttpClientModule } from '@angular/common/http'; // Módulo para comunicar back con front

// import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    FormsModule, // Módulo para forms front
    RouterModule,
    HttpClientModule // Módulo para comunicar back con front
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
