import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatsComponent} from './stats/stats.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
    {path: 'stats', component: StatsComponent},
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
