import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Picture } from 'src/model/Picture';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  @Input()
  protected image: Picture;

  @Output()
  disabled: EventEmitter<boolean> = new EventEmitter<boolean>();

  public ngOnInit(): void {
    console.log(this.image);
  }

  public unselect(): void {
    this.disabled.emit(true);
    this.image = null;
  }
}
