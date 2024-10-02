import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { IToDo } from '../../../models/interfaces/IToDo';
import { environment } from '../../environments/environment';

describe('TodosService', () => {
  let service: TodosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TodosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todos', () => {
    const todos:  IToDo[] = <IToDo[]>[
      {
        id: 1,
        task: 'Test Todo',
        dateDue: new Date(),
        priority: 1,
        completed: false
      }
    ];
    service.getTodos().subscribe((todos: IToDo[]) => {
      expect(todos).toEqual(todos);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/todos`);
    expect(req.request.method).toBe('GET');
    req.flush(todos);
  });

  it('should add todo', () => {
    const todo: IToDo = <IToDo> {
      id: 1,
      task: 'Test Todo',
      dateDue: new Date(),
      completed: false,
      priority: 1,
    };
    service.addTodo(todo).subscribe((result: IToDo) => {
      expect(result).toEqual(todo);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/todos`);
    expect(req.request.method).toBe('POST');
    req.flush(todo);
  });

  it('should update a todo and return the updated todo', () => {
    const todoToUpdate: IToDo = {
      id: 1,
      task: 'Test Task',
      dateDue: new Date(),
      priority: 1,
      completed: false,
      created: new Date(),
      modified: new Date()
    };

    const updatedTodo: IToDo = { ...todoToUpdate, completed: true };

    service.updateTodo(todoToUpdate).subscribe(result => {
      expect(result).toEqual(updatedTodo);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/todos/${todoToUpdate.id}`);
    expect(req.request.method).toEqual('PATCH');

    expect(req.request.body).toEqual({ completed: todoToUpdate.completed });

    req.flush(updatedTodo);

    httpMock.verify();
  });

  it('should delete a todo and return the deleted todo', () => {
    const todoToDelete: IToDo = {
      id: 1,
      task: 'Test Task',
      dateDue: new Date(),
      priority: 1,
      completed: false,
      created: new Date(),
      modified: new Date()
    };
    service.addTodo(todoToDelete).subscribe();

    const postReq = httpMock.expectOne(`${environment.apiUrl}/todos`);
    expect(postReq.request.method).toEqual('POST');
    postReq.flush(todoToDelete);

    service.removeTodo(todoToDelete).subscribe(result => {
      expect(result).toEqual(todoToDelete);
    });

    const deleteReq = httpMock.expectOne(`${environment.apiUrl}/todos/${todoToDelete.id}`);
    expect(deleteReq.request.method).toEqual('DELETE');

    deleteReq.flush(todoToDelete);

    httpMock.verify();
  });
});
