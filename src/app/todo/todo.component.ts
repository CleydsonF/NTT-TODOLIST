import { Component, TemplateRef } from '@angular/core';
import { Todo } from './class/todo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoValue: String = '';
  isInputEmpty: boolean = true;

  todoList: Todo[] = [
  ];
  
  finishedList: Todo [] =[
  ]
  constructor(private modalService: NgbModal){}

  addTodo(){
    if (this.todoValue.trim() !== '') {
      this.todoList.push({ content: this.todoValue, value: false });
      this.todoValue = ''; // Limpar o campo de entrada após adicionar a tarefa
      this.isInputEmpty = true; // Desativar o botão "Adicionar" novamente
    }
  }

  checkInputEmpty() {
    this.isInputEmpty = this.todoValue.trim() === '';
  }
  
  changeTodo(i: number){
    const item = this.todoList.splice(i,1);
    console.log(item);
    this.finishedList.push(item[0]);
  }

  changeFinished(i:number){
    const item = this.finishedList.splice(i,1);
    this.todoList.push(item[0]);
  }

  openModal(content: TemplateRef<Element>, i: number, type: String){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result)=>{
        if(type == 'todoList'){
          this.todoList.splice(i,1);
        }else{
          this.finishedList.splice(i,1);
        }

      },
      (reason)=>{

    }
    )
  }
  }

  
