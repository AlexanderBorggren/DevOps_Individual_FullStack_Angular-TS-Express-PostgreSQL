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


});
