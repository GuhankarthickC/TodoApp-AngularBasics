import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../models/Todo';
import { catchError } from 'rxjs';
import { NgIf } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoItemComponent, FormsModule, FilterTodosPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit{

  searchTerm = signal('');
  todoItemsSignal = signal<Array<Todo>>([]); 
  ngOnInit(): void {
  this.todoService.getTodos().pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe((todos) => {
      this.todoItemsSignal.set(todos);
    });

  }

  todoToggled(todoItem: Todo){
    this.todoItemsSignal.update((todos) => {
      return todos.map((todo) => {
        if(todo.id === todoItem.id){
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })
    })
  }
  todoService = inject(TodosService);

}
