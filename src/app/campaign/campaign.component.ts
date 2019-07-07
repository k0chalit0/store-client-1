import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Campaign } from '../shared/campaign';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  campaigns: Campaign[];
  displayedColumns = ['name', 'details'];
  dataSource: Campaign[];
  newcampaignForm: FormGroup;
  newCampaign: Campaign;
  constructor( private campaignService: CampaignService,
               @Inject('BaseURL')
               private BaseURL,
               private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.getCampaigns();
  }
  createForm() {
    this.newcampaignForm = this.fb.group({
      name: ['', Validators.compose([ Validators.required, Validators.maxLength(20)])],
      details: ['', []],
    });
  }

  onSubmit() {
    this.newCampaign = this.newcampaignForm.value;
    this.campaignService.addCampaign(this.newCampaign).subscribe(
      response => { this.getCampaigns(); this.clearForm(); },
      err => console.log(err)
    );
  }

  clearForm() {
    this.newcampaignForm.reset({
      name: '',
      details: ''
    });
    const form: HTMLFormElement = document.getElementById('newcampaignForm') as HTMLFormElement;
    form.reset();
  }

  getCampaigns() {
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
      this.dataSource = this.campaigns;
      console.log(campaigns);
    });
  }

}
