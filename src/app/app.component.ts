import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PictureApiService } from './services/picture-api.service';
import {
  first
} from 'rxjs/operators';
import { Picture } from 'src/model/Picture';
import { Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public selected: Picture = null;
  public images: Picture[] = [];
  public groupedImages: Picture[][] = [];

  public stack = 0; // Number of pictures loaded

  protected images$: Observable<Picture[]>;

  public constructor(public pictureApiService: PictureApiService) {}

  public ngOnInit(): void {
    fromEvent(window, 'resize').subscribe(() => { // Update the rows when the window is resized
      console.log(Math.floor(window.innerWidth / 200));
      const size = Math.floor(window.innerWidth / 200);
      this.groupedImages = [];
      for ( let i = 0; i < this.images.length; i += size) {
          this.groupedImages.push(this.images.slice(i, i + size));
      }
    });

    this.loadmore();
  }

  public loadmore(): void {
    this.pictureApiService
      .getNextPics(this.stack)
      .pipe(first())
      .subscribe(newImages => {
        this.images = this.images.concat(newImages);
        this.stack += newImages.length;

        const lineSize = Math.floor(window.innerWidth / 200);
        this.groupedImages = [];
        for ( let iterPic = 0; iterPic < this.images.length; iterPic += lineSize) {
            this.groupedImages.push(this.images.slice(iterPic, iterPic + lineSize));
        }
      });
  }

  protected select(image: Picture): void {
    this.selected = image;
  }

  protected updateFromChild($event) {
    this.selected = null;
  }
}
