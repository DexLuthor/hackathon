import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NavigationComponent} from './core/navigation/navigation.component';
import {AsideNavigationComponent} from './core/aside-navigation/aside-navigation.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {ShowcaseComponent} from './pages/showcase/showcase.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {TodoViewComponent} from './pages/todo/components/todo-view/todo-view.component';
import {TodoListComponent} from './pages/todo/components/todo-list/todo-list.component';
import {HttpErrorInterceptor} from "./shared/interceptors/http-error-interceptor.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SnackBarService} from "./shared/services/snack-bar.service";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AsideNavigationComponent,
    NotFoundComponent,
    ShowcaseComponent,
    TodoViewComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSnackBarModule
  ],
  providers: [
    SnackBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
