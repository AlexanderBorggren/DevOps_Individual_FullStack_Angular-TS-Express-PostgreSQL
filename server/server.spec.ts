import request from 'supertest';
import express from 'express';
import { AppDataSource } from './Database';
import { Todo } from '../models/Todo';
import { Repository } from 'typeorm';

const app = express();
let todoRepository: Repository<Todo>;

beforeAll(async () => {
  jest.setTimeout(90000);
  await AppDataSource.initialize();
  todoRepository = AppDataSource.getRepository(Todo);
  app.use(express.json());
});

// Mocka några data innan testerna körs
beforeEach(async () => {
  jest.setTimeout(90000);
  await todoRepository.clear(); // Rensa databasen innan varje test

  // Skapa en mockad todo
  const todo = todoRepository.create({
    task: 'Test Todo',
    completed: false,
    dateDue: new Date(),
    priority: 1,
  });
  await todoRepository.save(todo);
});
//test

describe('Todos API', () => {
  it('should GET all todos', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(Array.isArray(res.body.data)).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0); // Kontrollera att det finns data
  });

  it('should POST a new todo', async () => {
    const newTodo = {
      task: 'New Test Todo',
      completed: false,
      dateDue: new Date(),
      priority: 2,
    };

    const res = await request(app).post('/todos').send(newTodo);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(res.body.data).toMatchObject(newTodo);
  });

  it('should PATCH an existing todo', async () => {
    const todo = await todoRepository.findOneBy({ task: 'Test Todo' });
    const updatedTodo = { completed: true };

    const res = await request(app).patch(`/todos/${todo?.id}`).send(updatedTodo);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(res.body.data.completed).toBe(true);
  });

  it('should DELETE an existing todo', async () => {
    const todo = await todoRepository.findOneBy({ task: 'Test Todo' });

    const res = await request(app).delete(`/todos/${todo?.id}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');

    const foundTodo = await todoRepository.findOneBy({ id: todo?.id });
    expect(foundTodo).toBeNull(); // Kontrollera att todo har tagits bort
  });
});

afterAll(async () => {
  await AppDataSource.destroy();
});
