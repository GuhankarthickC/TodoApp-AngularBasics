import { Component, input, output } from '@angular/core';
import { Todo } from '../models/Todo';
import { HighlightCompletedTodoDirective } from '../directives/highlight-completed-todo.directive';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [HighlightCompletedTodoDirective],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  todoToggle = output<Todo>();

  todoClicked(){
    this.todoToggle.emit(this.todo());
  }
}
