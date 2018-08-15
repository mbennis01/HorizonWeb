import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { nextTick } from 'q';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Output() next = new EventEmitter(); 
  @Output() past = new EventEmitter(); 

  constructor() { }

  ngOnInit() {
  }

  precedent(){
    this.past.emit();
  }

  suivant(){
    this.next.emit();
  }

}
