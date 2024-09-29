import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IToDo} from "../../../models/interfaces/IToDo";
import {map, Observable} from "rxjs";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TodosService {
  baseUrl = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  getTodos(): Observable<IToDo[]> {
    return this.http.get<{status: string, data: IToDo[]}>(`${this.baseUrl}/todos`)
      .pipe(
        map(res => res.data)
      )
  }

  addTodo(newTodo: { dateDue: string; task: string; completed: boolean; priority: number | null }) {
    return this.http.post(`${this.baseUrl}/todos`, newTodo);
  }

  updateTodo(todo: IToDo) {
    const {id, completed} = todo;

    return this.http.patch(`${this.baseUrl}/todos/${id}`, {completed});
  }

  removeTodo(todo: IToDo) {
    const {id} = todo;
    return this.http.delete(`${this.baseUrl}/todos/${id}`);
  }
}
