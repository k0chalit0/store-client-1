import {Routes} from '@angular/router';

import {CatalogComponent} from '../catalog/catalog.component';
import {HomeComponent} from '../home/home.component';
import {ContactComponent} from '../contact/contact.component';
import {ItemDetailComponent} from '../item-detail/item-detail.component';
import {AboutComponent} from '../about/about.component';
import { ClientComponent } from '../client/client.component';
import { CampaignComponent } from '../campaign/campaign.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'catalogo', component: CatalogComponent},
  {path: 'client', component: ClientComponent},
  {path: 'contactanos', component: ContactComponent},
  {path: 'acercade', component: AboutComponent},
  {path: 'itemdetail/:id', component: ItemDetailComponent},
  {path: 'campaigns', component: CampaignComponent},
  {path: 'campaing/:id', component: CampaignComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];
