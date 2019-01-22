import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-dialog-comp',
    templateUrl: './dialog-comp.component.html',
    styleUrls: ['./dialog-comp.component.css']
})
export class DialogCompComponent {

    constructor(public dialogRef: MatDialogRef<DialogCompComponent>, @Inject(MAT_DIALOG_DATA) public name: string) {
    }
}
