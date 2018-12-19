import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatsComponent} from './stats/stats.component';
import {AdminComponent} from './admin/admin.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
    {path: 'stats', component: StatsComponent},
    {path: 'admin', component: AdminComponent},
    {path: '', component: MainComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
