import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {LoginModalComponent} from './components/modals/login-modal/login-modal.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from './services/auth.service';
import {AppConfigs} from './components/configs';
import {AuthGuard} from './guards/auth.guard';
import {ValidationService} from './services/validation.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ValidationMessagesComponent} from './components/validation-messages/validation-messages.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import {VideosService} from './services/videos.service';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomepageComponent,
    LoginModalComponent,
    ValidationMessagesComponent,
    HeaderComponent,
    FooterComponent,
    UploadListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
  ],
  providers: [
    AuthService,
    AppConfigs,
    AuthGuard,
    ValidationService,
    VideosService,
  ],
  entryComponents: [
    LoginModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
