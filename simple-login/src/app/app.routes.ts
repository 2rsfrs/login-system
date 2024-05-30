import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UpdateComponent } from './pages/update/update.component';
import { DeleteComponent } from './pages/delete/delete.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent }
        ]
    },
    { 
        path: 'update', component: UpdateComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent }
        ]
    },
    { 
        path: 'delete', component: DeleteComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent }
        ]
    }
];