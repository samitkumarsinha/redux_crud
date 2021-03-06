import { User } from './../../user';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from './../../data.service';
import { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_ADD, USER_DELETE, TOKEN_ADD } from '../actions/user-action';

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
      this.getUsers(data);
      const token = {id: item.accessToken, email: data.email}
      this.store.dispatch({type: TOKEN_ADD, payload: token});
    });
  }
  getUsers(userdata: User){
    this.ds.getUsers().subscribe((data) => {
      const recs = data.filter(item => item.email === userdata.email);
      console.log(recs);
      const id = recs[0]._id;
      userdata._id = id;
      this.store.dispatch({type: USER_ADD, payload: userdata});
    })
  }
}
