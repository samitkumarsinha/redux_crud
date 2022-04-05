import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { InsertComponent } from './insert/insert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './reducers';

@NgModule({
  declarations: [
    ListComponent,
    InsertComponent,
    DashboardComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(rootReducer)
  ],
  exports: [
    ListComponent,
    InsertComponent,
    DashboardComponent,
    MenuComponent
  ]
})
export class UsersModule { }
