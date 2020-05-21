import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from './../../shared/note.module';
import { NotesService } from 'src/app/shared/notes.service';
import { Router, ActivatedRoute,Params } from '@angular/router';


@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note:Note; 
  noteId:number;
  new:boolean;


  constructor(private notesService:NotesService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((para : Params)=>{
      this.note = new Note()

      if(para.id){
        this.note = this.notesService.get(para.id)
        this.new = false
        this.noteId = para.id
      }

      else{
        this.new = true
      }
    })


  }

onSubmit(form:NgForm){
if(this.new){

  this.notesService.add(form.value)
  
}
else{
  this.notesService.update(this.noteId,form.value.title,form.value.body)
}
this.router.navigate(['/'],{relativeTo:this.route})


}

cancel(){
  console.log('cancel')
  this.router.navigateByUrl('/')

}

}
