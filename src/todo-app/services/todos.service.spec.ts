import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { IToDo } from '../../../models/interfaces/IToDo';


describe('TodosService', () => {
  let service: TodosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosService,
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

  it('should retrieve todos from the API via GET', () => {
    const mockTodos: IToDo[] = [
      {
        id: 1,
        task: 'Test Task 1',
        dateDue: new Date('2023-12-31'),
        priority: 1,
        completed: false,
        created: new Date('2023-01-01'),
        modified: new Date('2023-01-02'),
        deleted: new Date('2023-01-03')
      },
      {
        id: 2,
        task: 'Test Task 2',
        dateDue: new Date('2024-01-15'),
        priority: 2,
        completed: true,
        created: new Date('2023-01-05'),
        modified: new Date('2023-01-06'),
        deleted: new Date('2023-01-07')
      }
    ];

    service.getTodos().subscribe(todos => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/todos`);
    expect(req.request.method).toBe('GET');
    req.flush({ status: 'OK', data: mockTodos });
  });

  it('should send POST request to add a new todo', () => {
    const newTodo = { task: 'New Task', dateDue: '2024-01-01', completed: false, priority: 1 };

    service.addTodo(newTodo).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/todos`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTodo);
    req.flush({ status: 'OK' });
  });

  it('should send PATCH request to update a todo', () => {
    const updatedTodo: IToDo = {
      id: 1,
      task: 'Updated Task',
      dateDue: new Date('2024-01-01'), // Use Date object instead of a string
      completed: true,
      priority: 2,
      created: new Date('2023-01-01'),
      modified: new Date('2023-01-02'),
      deleted: new Date('2023-01-03')
    };


    service.updateTodo(updatedTodo).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/todos/${updatedTodo.id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ completed: updatedTodo.completed });
    req.flush({ status: 'OK' });
  });

  it('should send DELETE request to remove a todo', () => {
    const todoToDelete: IToDo = {
      id: 1,
      task: 'Task to be deleted',
      dateDue: new Date('2024-01-01'),
      completed: false,
      priority: 1,
      created: new Date('2023-01-01'),
      modified: new Date('2023-01-02'),
      deleted: new Date('2023-01-03')};

    service.removeTodo(todoToDelete).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/todos/${todoToDelete.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ status: 'OK' });
  });
});
