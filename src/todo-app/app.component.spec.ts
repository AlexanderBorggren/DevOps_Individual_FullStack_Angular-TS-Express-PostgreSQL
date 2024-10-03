import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodosService } from './services/todos.service';
import { IToDo } from "../../models/interfaces/IToDo";
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockTodosService: jasmine.SpyObj<TodosService>;

  beforeEach(async () => {
    mockTodosService = jasmine.createSpyObj('TodosService', ['getTodos', 'addTodo', 'updateTodo', 'removeTodo']);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        FormsModule,
      ],
      providers: [
        { provide: TodosService, useValue: mockTodosService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on ngOnInit', () => {
    const mockTodos: IToDo[] = [
      { id: 1, task: 'Test TodoMMM', completed: false, dateDue: new Date(), priority: 1, created: new Date(), modified: new Date() }
    ];

    mockTodosService.getTodos.and.returnValue(of(mockTodos));

    component.ngOnInit();

    expect(mockTodosService.getTodos).toHaveBeenCalled();
    expect(component.allTodos.length).toBe(1);
    expect(component.allTodos).toEqual(mockTodos);
  });

  it('should add a new todo and refresh the todo list', () => {
    const newTodoTask = 'New Test Todo';
    const newTodoDate = new Date('2024-10-03T11:30:11.000Z');
    const newTodoPriority = 2;

    const todoPayload = {
      task: newTodoTask,
      dateDue: newTodoDate,
      priority: newTodoPriority,
      completed: false
    };

    const mockAddedTodo: IToDo = {
      id: 2,
      task: newTodoTask,
      completed: false,
      dateDue: newTodoDate,
      priority: newTodoPriority,
      created: new Date(),
      modified: new Date()
    };

    const initialTodos: IToDo[] = [
      { id: 1, task: 'Test Todo', completed: false, dateDue: new Date(), priority: 1, created: new Date(), modified: new Date() }
    ];

    const updatedTodos: IToDo[] = [...initialTodos, mockAddedTodo];

    mockTodosService.addTodo.and.returnValue(of(mockAddedTodo));
    mockTodosService.getTodos.and.returnValue(of(updatedTodos));

    component.newTodoTask = newTodoTask;
    component.newTodoDate = newTodoDate;
    component.newTodoPriority = newTodoPriority;

    component.addTodo();

    expect(mockTodosService.addTodo).toHaveBeenCalledWith(todoPayload);
    expect(mockTodosService.getTodos).toHaveBeenCalled();
    expect(component.allTodos.length).toBe(2);
    expect(component.allTodos).toEqual(updatedTodos);
  });

  it('should call updateTodo when checkbox is clicked and handle the response', () => {
    const mockTodo: IToDo = {
      id: 10,
      task: 'Test Todo',
      completed: false,
      dateDue: new Date(),
      priority: 1,
      created: new Date(),
      modified: new Date()
    };

    const updatedTodo: IToDo = { ...mockTodo, completed: true };
    mockTodosService.updateTodo.and.returnValue(of(updatedTodo));

    component.setTodoCompletedState(mockTodo);

    expect(mockTodosService.updateTodo).toHaveBeenCalledWith(mockTodo);
  });

  it('should call removeTodo, then refresh todos list', () => {
    const mockTodo: IToDo = {
      id: 10,
      task: 'Test Todo',
      completed: false,
      dateDue: new Date(),
      priority: 1,
      created: new Date(),
      modified: new Date()
    };

    const initialTodos: IToDo[] = [
      { id: 1, task: 'Test Todo 1', completed: false, dateDue: new Date(),
        priority: 1, created: new Date(), modified: new Date() },
      { id: 10, task: 'Test Todo', completed: false, dateDue: new Date(),
        priority: 1, created: new Date(), modified: new Date() }
    ];

    const updatedTodos: IToDo[] = [
      { id: 1, task: 'Test Todo 1', completed: false, dateDue: new Date(),
        priority: 1, created: new Date(), modified: new Date() }
    ];

    component.allTodos = initialTodos;

    mockTodosService.removeTodo.and.returnValue(of({}));

    mockTodosService.getTodos.and.returnValue(of(updatedTodos));

    component.deleteTodo(mockTodo);

    expect(mockTodosService.removeTodo).toHaveBeenCalledWith(mockTodo);

    expect(mockTodosService.getTodos).toHaveBeenCalled();

    expect(component.allTodos).toEqual(updatedTodos);
  });
});
