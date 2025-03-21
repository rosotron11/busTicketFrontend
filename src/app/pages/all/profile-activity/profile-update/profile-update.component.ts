import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../../interfaces/user';

@Component({
  selector: 'app-profile-update',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.css'
})
export class ProfileUpdateComponent implements OnInit{
  
  @Input() profile!: IUser;
  @Output() sendForm=new EventEmitter<any>()

  updateForm:FormGroup= new FormGroup({
    id: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required,Validators.minLength(2)]),
    email:new FormControl('',[Validators.required,Validators.email])
  })

  ngOnInit(): void {
    this.updateForm.controls["id"].setValue(this.profile.id);
    this.updateForm.controls["username"].setValue(this.profile.username);
    this.updateForm.controls["email"].setValue(this.profile.email)
  }

  sendSignalforUpdate()
  {
    this.sendForm.emit(this.updateForm)
  }
}
