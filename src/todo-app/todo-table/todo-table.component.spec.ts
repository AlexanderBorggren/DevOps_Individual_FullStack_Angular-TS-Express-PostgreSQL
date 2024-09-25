import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoTableComponent } from './todo-table.component';
import { IToDo } from "../../../models/interfaces/IToDo";

describe('TodoTableComponent', () => {
  let component: TodoTableComponent;
  let fixture: ComponentFixture<TodoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit "changed" when toggleTodoCompletedState is called', () => {
    const todo: IToDo = <IToDo>{ id: 1, task: 'Test Todo', completed: false, priority: 1 };
    spyOn(component.changed, 'emit');

    component.toggleTodoCompletedState(todo);

    expect(component.changed.emit).toHaveBeenCalledWith({ ...todo, completed: true });
  });

  it('should emit "deleted" when removeTodo is called', () => {
    const todo: IToDo = <IToDo>{ id: 1, task: 'Test Todo', completed: false, priority: 1 };
    spyOn(component.deleted, 'emit');

    component.removeTodo(todo);

    expect(component.deleted.emit).toHaveBeenCalledWith(todo);
  });

  it('should toggle todo completed state', () => {
    const todo: IToDo = <IToDo>{ id: 1, task: 'Test Todo', completed: false, priority: 1 };
    component.toggleTodoCompletedState(todo);

    expect(todo.completed).toBeTrue();
  });
});
