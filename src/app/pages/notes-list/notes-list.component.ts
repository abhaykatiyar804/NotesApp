import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.module';
import { NotesService } from 'src/app/shared/notes.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations:[
    trigger('itemAnim',[
      transition('void => *',[
        style({
          height:0,
          opacity:0,
          transform:'scale(0.85)',
          'margin-bottom':0,
          paddingTop:0,
          paddingBottom:0,
          paddingLeft:0,
          paddingRight:0,
        }),
        animate('50ms',style({
          height:'*',
          'margin-bottom':'*',
          paddingTop:'*',
          paddingBottom:'*',
          paddingLeft:'*',
          paddingRight:'*',

        })),
        animate(68)
      ]),
      transition('* => void',[
        animate(50,style({
          transform:'scale(1.05',

        })),
        animate(50,style({
          transform:'scale(1)',
          opacity:0.75
        })),
        animate('120ms ease-out',style({
          opacity:0,
          transform:'scale(0.68)'
        })),

        animate('150ms ease-out',style({
          height:0,
          'margin-bottom':0,
          paddingTop:0,
          paddingBottom:0,
          paddingLeft:0,
          paddingRight:0,

        }))


      ]),

     


    ]),

    trigger('listAnim',[
      transition('* => *',[
        query(':enter',[
          style({
            opacity:0,
            height:0,
          }),
          stagger(100,[
            animate('0.2s ease')
          ])
        ],{
          optional:true
        })
      ])
      
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();
  constructor(private notesService:NotesService) { }

  ngOnInit(): void {

    this.notes = this.notesService.getAll()

  }

  deleteNote(id){
    this.notesService.delete(id)
  }

}
