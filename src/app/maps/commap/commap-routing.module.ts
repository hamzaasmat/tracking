import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComMapComponent } from './commap.component';
import { AuthGuard } from 'src/app/authantication/guard/auth.guard';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: ComMapComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
