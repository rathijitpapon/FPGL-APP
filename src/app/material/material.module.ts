import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

const materialComponents = [
  MatButtonModule, MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
];


@NgModule({
  exports: [materialComponents],
  imports: [materialComponents]
})
export class MaterialModule {
}
