import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LightboxModule } from 'ngx-lightbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DateFormaterPipe } from './date-formater.pipe';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ImageLoaderDirective } from './ImageLoader.directive';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { TimeTransformPipe } from './time-transform.pipe';


@NgModule({
  declarations: [
    // NgbdSortableHeader,
    DateFormaterPipe,
    PageNotFoundComponent,
    ImageLoaderDirective,
    TimeTransformPipe,
    FileUploaderComponent,
  ],
  imports: [
    ReactiveFormsModule,

    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    NgScrollbarModule,
    NgxImageZoomModule,NgMultiSelectDropDownModule.forRoot(),LightboxModule
    
   ],
   exports:[
    DateFormaterPipe,
    FileUploaderComponent,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
    NgxImageZoomModule,
    TimeTransformPipe,
    NgMultiSelectDropDownModule,LightboxModule,
    FormsModule,
    NgbModule,
    NgScrollbarModule,
               ]

            
})
export class CommonModules { 
  constructor(lib: FaIconLibrary) {
   lib.addIconPacks(fas);
}
}
