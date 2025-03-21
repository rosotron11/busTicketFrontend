import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-update',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.css'
})
export class ProfileUpdateComponent implements OnInit{
  
  @Input() profile:any
  @Output() sendForm=new EventEmitter<any>()

  updateForm:FormGroup= new FormGroup({
    id: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required,Validators.minLength(2)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    roles:new FormControl('')
  })

  ngOnInit(): void {
    this.updateForm.controls["id"].setValue(this.profile.id);
    this.updateForm.controls["username"].setValue(this.profile.username);
    this.updateForm.controls["email"].setValue(this.profile.email)
    this.updateForm.controls["roles"].setValue(this.profile.roles)
  }

  sendSignalforUpdate()
  {
    this.sendForm.emit(this.updateForm.value)
  }
}
