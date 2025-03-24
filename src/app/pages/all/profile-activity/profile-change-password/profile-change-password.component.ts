import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-change-password.component.html',
  styleUrl: './profile-change-password.component.css'
})
export class ProfileChangePasswordComponent{
  @Output() sendForm=new EventEmitter<any>();
  @Output() sendCloseSignal=new EventEmitter<any>();

  changeForm:FormGroup=new FormGroup({
    id:new FormControl(`${JSON.parse(localStorage.getItem('userDet')!).id}`),
    password:new FormControl('',[Validators.required]),
    newPassword:new FormControl('',[Validators.required])
  })

  sendSignalforChange()
  {
    console.log(JSON.parse(localStorage.getItem('userDet')!).id)
    this.sendForm.emit(this.changeForm)
  }
  closeChangePanel()
  {
    this.sendCloseSignal.emit();
  }
}
