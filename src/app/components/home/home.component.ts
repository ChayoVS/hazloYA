import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'src/app/models';
import { UserService, AuthenticationService, TodoService } from 'src/app/services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TodoService]
})
export class HomeComponent implements OnInit {

  loading = false;
  user: User;
  userFromApi: User;
  toDoListArray: any[];
  // toDoListArray: any = [];

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private toDoService: TodoService
  ) {
    
    this.user = this.authenticationService.userValue;
   }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
        this.loading = false;
        this.userFromApi = user;
    });

    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        let x: any = element.payload.toJSON();
        x['$key'] = element.key;
        this.toDoListArray.push(x);
      })
    })

    //sort array isChecked false -> true

    if(this.toDoListArray === undefined){
      console.log('No hay datos')
    }else{
      this.toDoListArray.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })
    }
    
  }

  onAdd(itemTitle: any){
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null
  }

  alterCheck($key: string, isChecked: boolean){
    this.toDoService.checkOrUnCheckTitle($key, !isChecked)
  }

  onDelete($key: string){
    this.toDoService.removeTitle($key);
  }

}
