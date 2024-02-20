import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MovieslistComponent } from '../movieslist/movieslist.component';
import { NowshowinglistComponent } from '../nowshowinglist/nowshowinglist.component';


@NgModule({
    declarations: [
        HomeComponent,
        MovieslistComponent, // Add the child components to the declarations array
        NowshowinglistComponent,  // Add the child components to the declarations array
    ],
    imports: [CommonModule],
    exports: [HomeComponent], // Export the parent component if needed
  })
  export class HomeModule {}