import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {TodoModel} from "../../../shared/models/todo.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly baseUrl = environment.baseUrl;
  private readonly subject = new BehaviorSubject<TodoModel[]>([]);
  readonly todos$: Observable<TodoModel[]> = this.subject.asObservable();

  constructor(private http: HttpClient) {
  }

  public fetchTodos() {
    this.fetchTodosObservable()
      .subscribe(this.doOnNext);
  }

  public save(todo: TodoModel) {
    this.http.post<TodoModel>(this.baseUrl + "/todo", todo)
      .pipe(
        switchMap(_ => this.fetchTodosObservable())
      ).subscribe(this.doOnNext);
  }

  public update(todo: TodoModel) {
    this.http.patch(this.baseUrl + "/todo", todo).pipe(
      switchMap(_ => this.fetchTodosObservable())
    ).subscribe(this.doOnNext);
  }

  public delete(id: string) {
    this.http.delete(this.baseUrl + "/todo/delete/" + id)
      .pipe(
        switchMap(_ => this.fetchTodosObservable())
      ).subscribe(this.doOnNext);
  }

  private fetchTodosObservable(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.baseUrl + "/todo/all");
  }

  private doOnNext = (todos: TodoModel[]) => {
    this.subject.next(todos);
  }
}
