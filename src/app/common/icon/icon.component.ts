import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  @HostBinding('style.-webkit-mask-image')private _path:string

  @Input() set path(filePath:string){
    this._path=`url('${filePath}')`
  }
}
