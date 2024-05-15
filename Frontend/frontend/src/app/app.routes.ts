import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { EventViewComponent } from './event-view/event-view.component';
import { EventDetailsComponent } from './event-details/event-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'eventView', component: EventViewComponent},
    { path: 'eventDetails/:id', component: EventDetailsComponent}
];

