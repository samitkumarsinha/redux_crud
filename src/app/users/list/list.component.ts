import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { UserListRequestAction, UserListSuccessAction } from '../actions/user-action';
import { getUserLoaded, getUserLoading, getUsers, RootReducerState } from '../reducers';
import { User } from '../../user';
import { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_ADD, USER_DELETE, USER_UPDATE } from '../actions/user-action';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: any[] = [];
  subscribtion: Subscription | undefined;
  regform;
  constructor(private ds: DataService, private fb: FormBuilder, private store: Store<RootReducerState>) {
    this.regform = this.fb.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.getUsers();
  }
  updateUser(data: any): void{
    this.ds.updateUser(data).subscribe(resp => {
      this.store.dispatch({type: USER_UPDATE, payload: data})
      this.getUsers();
    });
  }
  deluser(id: string){
    this.ds.delUser(id).subscribe(data => {
      this.store.dispatch({type: USER_DELETE, payload: id})
      this.getUsers();
    });
  }
  edituser(data: User){
    this.regform.get('id')?.setValue(data._id);
    this.regform.get('username')?.setValue(data.username);
    this.regform.get('password')?.setValue(data.password);
    this.regform.get('email')?.setValue(data.email);
  }
  getUsers(){
    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData = this.store.select(getUsers);
    combineLatest([loading$, loaded$]).subscribe(data => {
      // loaded$.subscribe(x => console.log(x))
      if(!data[0] && !data[1]){
        // this.store.dispatch(new UserListRequestAction())
        this.ds.getUsers().subscribe((data) => {
          console.log("first time only", data);
          this.users = data;
          this.store.dispatch(new UserListSuccessAction({data}));
        })
      }else{
        getUserData.subscribe(item => {
          this.users = item;
        })
      }
    });
  }
}
