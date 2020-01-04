import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { VacationManagementComponent } from './vacation_management/vacation_management.component';
import { VacationManagementAddComponent } from './vacation_management/vacation_management_add/vacation_management_add.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'leave_requests', component: VacationManagementComponent },
    { path: 'leave_requests/add', component: VacationManagementAddComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);