import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, EMPTY, Observable, throwError} from "rxjs";
import {SnackBarService} from "../services/snack-bar.service";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: SnackBarService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError(this.httpError));
  }

  private httpError = (err: any) => {
    if (err instanceof HttpErrorResponse) {
      this.httpErrorToMessage(err);
      return EMPTY;
    }
    return throwError(err);
  }

  private httpErrorToMessage = (error: HttpErrorResponse) => {
    if (error.status === 0) {
      this.popup('Server unreachable');
    } else if (error.status >= 500) {
      this.popup('server error: ' + error.message);
    } else if (error.status >= 400 && error.status < 500) {
      this.popup('Error ' + error.error.status);
    }
  }

  private popup = (msg: string) => {
    this.snackBar.openSnackBar(msg);
  }
}
