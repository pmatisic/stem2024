import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-event-view',
  standalone: true,
  imports: [CommonModule,MatInputModule],
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.scss'
})
export class EventViewComponent {
    page:number;
    constructor() {
      this.page = 0;
    }

    changePage(broj: number){
      return broj+1;
    }
}
