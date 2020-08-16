import { TrainingListComponent } from './components/training-list/training-list.component';
import { EditExerciseSetComponent } from './components/edit-exercise-set/edit-exercise-set.component';
import { EditExerciseComponent } from './components/edit-exercise/edit-exercise.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertifyService } from './_services/alertify.service';
import { ErrorInterceptorProvider } from './_interceptors/ErrorInterceptor';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './_services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const BootstrapModules = [
  BsDropdownModule.forRoot(),
  TypeaheadModule.forRoot(),
  BsDatepickerModule.forRoot(),
  ButtonsModule.forRoot(),
  ModalModule.forRoot(),
  CollapseModule.forRoot()
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    RegisterComponent,
    NewTrainingComponent,
    EditExerciseComponent,
    EditExerciseSetComponent,
    TrainingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    BrowserAnimationsModule,
    BootstrapModules,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth']
      }
    }),
    ReactiveFormsModule
  ],
  providers: [AuthService, ErrorInterceptorProvider, AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
