import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AsideNavigationComponent} from './core/aside-navigation/components/navbar/aside-navigation.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TodoViewComponent} from './pages/todo/components/todo-view/todo-view.component';
import {TodoListComponent} from './pages/todo/components/todo-list/todo-list.component';
import {HttpErrorInterceptor} from "./shared/interceptors/http-error-interceptor.service";
import {SnackBarService} from "./shared/services/snack-bar.service";
import {NavbarLinkComponent} from './core/aside-navigation/components/navbar-link/navbar-link.component';
import {TodoBottomSheetComponent} from './pages/todo/components/todo-bottom-sheet/todo-bottom-sheet.component';
import {MaterialModule} from "./material.module";
import {AddTodoComponent} from './pages/todo/components/add-todo/add-todo.component';
import {FormsModule} from "@angular/forms";
import {SettingsModule} from "./pages/settings/settings.module";
import {DateDiffPipe} from './shared/pipes/date-diff.pipe';
import {ThreedotSlicePipe} from './shared/pipes/threedot-slice.pipe';
import {CapitalizePipe} from './shared/pipes/capitalize.pipe';
import {MusicModule} from "./pages/music/music.module";
import {ChipComponent} from './pages/todo/components/chip/chip.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideNavigationComponent,
    NotFoundComponent,
    TodoViewComponent,
    TodoListComponent,
    NavbarLinkComponent,
    TodoBottomSheetComponent,
    AddTodoComponent,
    DateDiffPipe,
    ThreedotSlicePipe,
    CapitalizePipe,
    ChipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    SettingsModule,
    MusicModule
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
