import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactType, Message} from '../shared/message';
import { ClientService } from '../services/client.service';
import { Client } from '../shared/client';
import { ContactService } from '../services/contact.service';
import { ContactMessage } from '../shared/contactMessage';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  messageForm: FormGroup;
  message: Message;
  contactType = ContactType;

  constructor(private fb: FormBuilder, private clientService: ClientService, private contactService: ContactService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.messageForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      telnum: ['', Validators.required],
      email: ['', Validators.required],
      agree: false,
      contacttype: 'Chat',
      text: ''
    });
  }

  onSubmit() {
    this.message = this.messageForm.value;
    let client: Client;
    client = {
      firstName: this.message.firstname,
      lastName: this.message.lastname,
      email: this.message.email,
      telephone: this.message.telnum ? this.message.telnum + '' : '',
    };
    let message: ContactMessage;
    message = {contentMessage: this.message.text, clientId: null};

    this.clientService.addClient(client).subscribe(
      response => {
          message.clientId = response.id;
          this.contactService.addContactMessage(message).subscribe(
            responsed => console.log('Success', responsed),
            err => console.log(err)
          );
        },
      err => console.log(err)
    );

    console.log(this.message);
    this.messageForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    // work around
    const form: HTMLFormElement = document.getElementById('form') as HTMLFormElement;
    form.reset();
  }

  saveClient(client: Client) {

  }
}
