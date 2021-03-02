import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITodo } from '../model/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit, OnDestroy {
  id: string;
  todo: ITodo;
  todoSub: Subscription;
  delSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.todoSub = this.todoService.getTodo(this.id).subscribe((data) => {
      this.todo = data;
    });
  }

  done() {
    this.delSub = this.todoService.deleteTodo(this.id).subscribe();
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    if (this.delSub) {
      this.delSub.unsubscribe();
    }
    if (this.todoSub) {
      this.todoSub.unsubscribe();
    }
  }
}
