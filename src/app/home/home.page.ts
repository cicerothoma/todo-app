import { Component, OnInit } from '@angular/core';
import { AlertController, ViewWillLeave, ViewDidEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ITodo } from '../model/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, ViewWillLeave, ViewDidEnter {
  todos: ITodo[];
  todoSub: Subscription;
  constructor(
    private todoService: TodoService,
    private alertCtrl: AlertController
  ) {}

  public async addTodo(): Promise<any> {
    const alert = await this.alertCtrl.create({
      header: 'Add Todo',
      message: 'Add Task',
      inputs: [
        {
          type: 'text',
          name: 'task',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: (data) => {
            this.todoService
              .addTodo({
                task: data.task,
                createdAt: Date.now(),
              })
              .subscribe(() => {
                this.getPost();
              });
          },
        },
      ],
    });
    await alert.present();
  }

  public ngOnInit(): void {}

  public getPost() {
    this.todoSub = this.todoService.getAllTodos().subscribe((data) => {
      this.todos = data;
      this.todos.sort((a, b) => b.createdAt - a.createdAt);
    });
  }

  public ionViewWillLeave(): void {
    if (this.todoSub) {
      this.todoSub.unsubscribe();
    }
  }

  public ionViewDidEnter(): void {
    this.getPost();
  }
}
