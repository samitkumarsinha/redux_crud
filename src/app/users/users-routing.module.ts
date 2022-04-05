import { ListComponent } from './list/list.component';
import { InsertComponent } from './insert/insert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: 'db', component: DashboardComponent, children: [
    {path: 'insert', component: InsertComponent},
    {path: 'list', component: ListComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
