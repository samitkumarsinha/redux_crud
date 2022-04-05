import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from './../../data.service';
import { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_ADD, USER_DELETE } from '../actions/user-action';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {
  regform;
  constructor(private ds: DataService, private fb: FormBuilder, private store: Store) {
    this.regform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }
  addUser(data: any): void{
    this.ds.addUser(data).subscribe(item => {
      console.log(item);
      this.store.dispatch({type: USER_ADD, payload: data})
    });
  }
}
