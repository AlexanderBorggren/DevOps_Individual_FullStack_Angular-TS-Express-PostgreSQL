import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TodosService } from './services/todos.service';
import {IToDo} from "../../models/interfaces/IToDo";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        FormsModule,
        TodoTableComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TodosService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo', () => {
    component.newTodoTask = 'Test task';
    component.newTodoPriority = 1;
    component.addTodo();

    expect(component.allTodos.length).toBe(1);
    expect(component.allTodos[0].task).toBe('Test task');
    expect(component.allTodos[0].priority).toBe(1);
  });

  it('should delete a todo', () => {
    const todo: IToDo = <IToDo> { id: 1, task: 'Test Todo', completed: false, priority: 1 };
    component.allTodos.push(todo);

    component.deleteTodo(todo);
    expect(component.allTodos.length).toBe(0);
  });

  it('should toggle todo completed state', () => {
    const todo: IToDo = <IToDo> { id: 1, task: 'Test Todo', completed: false, priority: 1 };
    component.allTodos.push(todo);

    component.setTodoCompletedState(todo);
    expect(todo.completed).toBeTrue();
  });
});
