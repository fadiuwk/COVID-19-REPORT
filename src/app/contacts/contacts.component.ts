import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor() { }

  contactForm:FormGroup = new FormGroup({

    first_name:new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(8)]) , 
    last_name:new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(8)]) , 
    email:new FormControl(null , [Validators.required , Validators.email]) , 
    msg:new FormControl(null , [Validators.required])
  })


  ngOnInit(): void {
  }

}
