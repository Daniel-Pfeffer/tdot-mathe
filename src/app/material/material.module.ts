import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule} from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSnackBarModule
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSnackBarModule
    ]
})
export class MaterialModule {
}
