import { PictureDeltaService } from './picture-delta.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture } from 'src/model/Picture';
import { Observable, of, Subject } from 'rxjs';
import { EndPoints } from 'src/model/EndPoints';
import { map, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PictureApiService {
  public pics: Subject<Picture>;
  private loaded = true;
  constructor(
    private deltaService: PictureDeltaService,
    private http: HttpClient
  ) {
    this.pics = <Subject<any>>this.deltaService.connect().pipe(
      map(
        (response: any): Picture => {
          return response;
        }
      )
    );
  }

  getEveryPictures(): Observable<Picture[]> {
    return this.http.get<Picture[]>(EndPoints.FIRST_UPDATE);
  }

  getNextPics(stack: number): Observable<Picture[]> {
    if (this.loaded) {
      this.loaded = false;
      return this.http
        .get<Picture[]>(EndPoints.NEXT_ITEMS, {
          params: { start: stack.toString() }
        })
        .pipe(
          first(),
          tap(() => {
            this.loaded = true;
          })
        );
    } else {
      return of([]);
    }
  }
}
