import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatTableModule} from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSnackBarModule,
        MatTableModule
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSnackBarModule,
        MatTableModule
    ]
})
export class MaterialModule {
}
