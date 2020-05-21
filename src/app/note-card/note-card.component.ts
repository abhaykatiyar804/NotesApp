import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit , AfterViewInit {

  @Input('title') title:string;
  @Input('body') body:string;
  @Input('link') link:string;
  @Output('delete') deleteEvent:EventEmitter<void>= new EventEmitter<void>() ;

  @ViewChild('truncator') truncator: ElementRef<HTMLElement>
  @ViewChild('bodytext') bodyText: ElementRef<HTMLElement>
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    


  }

  ngAfterViewInit(){
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      // if there is a text overflow, show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      // else (there is a text overflow), hide the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }

  }

  onXButtonClick(){

    this.deleteEvent.emit();
  }

}
