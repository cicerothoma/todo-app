import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITodo } from '../model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<any> {
    return this.http.get('http://localhost:3000/todos');
  }

  addTodo(data: ITodo): Observable<any> {
    return this.http.post('http://localhost:3000/todo', data);
  }

  getTodo(id: string): Observable<ITodo> {
    return this.http.get<ITodo>(`http://localhost:3000/todos/${id}`);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/todos/${id}`);
  }
}
