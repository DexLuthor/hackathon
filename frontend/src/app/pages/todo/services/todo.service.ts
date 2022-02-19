import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoModel} from "../../../shared/models/todo.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public fetchTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.baseUrl + "/todo/all");
  }
}
