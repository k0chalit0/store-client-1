import { Component, Inject, OnInit } from '@angular/core';
import { Client } from '../shared/client';
import { ClientService } from '../services/client.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  clients: Client[];
  displayedColumns = ['firstName', 'lastName', 'email', 'telephone'];
  dataSource: Client[];
  newClientForm: FormGroup;
  newClient: Client;
  constructor( private clientservice: ClientService,
               @Inject('BaseURL')
               private BaseURL,
               private fb: FormBuilder) {
    this.createForm();
}

  ngOnInit() {
    this.getClients();
  }
  createForm() {
    this.newClientForm = this.fb.group({
      firstName: ['', Validators.compose([ Validators.required, Validators.maxLength(20)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(20) ])],
      email: ['', Validators.compose( [Validators.required, Validators.email])],
      telephone: ['', []]
    });
  }

  onSubmit() {
    this.newClient = this.newClientForm.value;
    this.clientservice.addClient(this.newClient).subscribe(
      response => { this.getClients(); this.clearForm(); },
      err => console.log(err)
    );
  }

  clearForm() {
    this.newClientForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      telephone: ''
    });
    const form: HTMLFormElement = document.getElementById('newClientForm') as HTMLFormElement;
    form.reset();
  }

  getClients() {
    this.clientservice.getClients().subscribe(clients => {
      this.clients = clients;
      this.dataSource = this.clients;
      console.log(clients);
    });
  }
}
