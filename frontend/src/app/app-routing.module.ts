import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {TodoListComponent} from "./pages/todo/components/todo-list/todo-list.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "main",
    pathMatch: "full"
  },
  {
    path: "main",
    component: TodoListComponent
  },
  {
    path: "settings",
    loadChildren: () => import("./pages/settings/settings.module").then(m => m.SettingsModule)
  },
  {
    path: "music",
    loadChildren: () => import("./pages/music/music.module").then(m => m.MusicModule)
  },
  {
    path: "**",
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
