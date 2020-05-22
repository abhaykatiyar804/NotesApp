import { Injectable } from '@angular/core';
import { Note } from './note.module';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  note : Note[] = new Array<Note>();
  constructor() { }

  getAll(){
    return this.note
  }

  get(id:number){
    return this.note[id]
  }

  getId(note:Note){
    return this.note.indexOf(note)
  }

  add(note:Note){ 
    let newlength = this.note.push(note)
    let index = newlength-1
    return index;
     
  }

  update(id:number,title:string,body:string){
    let note = this.note[id]
    note.title = title;
    note.body = body
  }
  delete(id:number){
    this.note.splice(id,1)
  }
}
