import express, { Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './Database';
import {Todo} from "../models/Todo.ts";

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server started on port 3000');
      console.log('Database has been initialized!');

      const todoRepository = AppDataSource.getRepository(Todo);

      app.get('/todos', async (req: Request, res: Response) => {
        const allTodos = await todoRepository.find();

        return res.json({
          status: 'OK',
          data: allTodos
        });

      });

      app.post('/todos', async (req: Request, res: Response) => {
        const data = req.body;

        const result = await todoRepository.save(data);

        return res.json({
          status: 'OK',
          data: result
        })
      });
      app.patch('/todos/:id', async (req: Request, res: Response) => {
        const isCompleted = req.body.completed;
        const id = parseInt(req.params.id);
        const foundTodo = await todoRepository.findOneBy({id});

        let result;

        if (foundTodo) {
          foundTodo.completed = isCompleted;
          result = await todoRepository.save(foundTodo);
        }
        return res.json({
          status: 'OK',
          data: result,
        });
      });

      app.delete('/todos/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        let result = await todoRepository.delete({id});

        return res.json({
          status: 'OK',
          data: result,
        });


      });
    });

  })

  .catch((err) => {
    console.error('Error during Database/Server initialization:', err);
  });
