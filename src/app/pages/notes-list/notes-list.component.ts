import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('filterInput') filterInput  : ElementRef<HTMLInputElement>
  filteredNote:Note[]= new Array<Note>()
  constructor(private notesService:NotesService) { }

  ngOnInit(): void {

    this.notes = this.notesService.getAll()
    this.filteredNote = this.notesService.getAll()
    console.log(this.filteredNote)

  }

  deleteNote(note){
    let noteId = this.notesService.getId(note)
    this.notesService.delete(noteId)
    this.filter(this.filterInput.nativeElement.value)
  }

  noteLink(note){
    let noteId = this.notesService.getId(note)
    return noteId

  }


  filter(query:string){
    query = query.toLowerCase().trim()

    let results = []
    let terms = query.split(' ')

    terms = this.removeDuplicates(terms);

    console.log('on key up',results)

    terms.forEach(term=>{
      let result = this.filteredNotes(term)
      results = [...results,...result]
      console.log('on key up 2 ',results)
    })

    console.log('on key up 3 ',this.filteredNote)


    let uniqueResults  =  this.removeDuplicates(results)
    this.filteredNote = uniqueResults

    this.sortResult(results)



  }

  filteredNotes(query:string){
    console.log(query)
    query = query.toLowerCase().trim()
    let notes = this.notes.filter(note=>{
      if(note.title && note.title.toLowerCase().includes(query)){
        return true
      }
      if(note.body && note.body.toLowerCase().includes(query)){
        return true
      }

      return false;
    })

    return notes;
  }

  removeDuplicates(arr:Array<any>):Array<any>{
    let unique : Set<any> = new Set<any>();
    arr.forEach(e=>unique.add(e))

    return Array.from(unique)

  }


  sortResult(searchResult){

    let noteCount:Object={}

    searchResult.forEach(note=>{
      let id = this.notesService.getId(note)
      if(noteCount[id]){
        noteCount[id] +=1

      }
      else{
        noteCount[id] =1;
      }
    })

    this.filteredNote = this.filteredNote.sort((a,b)=>{

      let aId = this.notesService.getId(a)
      let bId = this.notesService.getId(b)

      let aCount = noteCount[aId]
      let bCount = noteCount[bId]

      return bCount - aCount

    })


  }

}
