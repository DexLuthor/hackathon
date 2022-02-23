import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject, Observable, switchMap, tap} from "rxjs";
import {TagModel} from "../../../shared/models/tag.model";
import {TodoService} from "./todo.service";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private readonly baseUrl = environment.baseUrl;
  private readonly subject = new BehaviorSubject<TagModel[]>([]);
  readonly tags$: Observable<TagModel[]> = this.subject.asObservable();

  constructor(private http: HttpClient, private todoService: TodoService) {
  }

  public fetchAll() {
    this.fetchObservable().subscribe(this.doOnNext);
  }

  public save(tag: TagModel) {
    this.http.post<TagModel>(this.baseUrl + '/tags', tag)
      .pipe(
        switchMap(_ => this.fetchObservable())
      ).subscribe(this.doOnNext);
  }

  public update(tag: TagModel) {
    this.http.patch<TagModel>(this.baseUrl + '/tags', tag)
      .pipe(
        switchMap(_ => this.fetchObservable()),
        tap(_ => this.todoService.fetchTodos())
      ).subscribe(this.doOnNext);
  }

  private fetchObservable(): Observable<TagModel[]> {
    return this.http.get<TagModel[]>(this.baseUrl + '/tags/all');
  }

  private doOnNext = (tags: TagModel[]) => this.subject.next(tags);
}
