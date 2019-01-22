import {Component} from '@angular/core';
import {ValidatorEnum, ValidatorManager} from '../validatorManager';
import {RestService} from '../rest.service';
import {Person} from '../person';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DialogCompComponent} from '../dialog-comp/dialog-comp.component';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent {
    // ngModels
    mail: string;
    name: string;
    guessMAndM: number;
    guessGummy: number;
    guess: number;
    errorResponse = '';

    // validator manager
    vm = new ValidatorManager();

    // validator types
    emailType = ValidatorEnum.email;
    emptyType = ValidatorEnum.empty;

    constructor(private service: RestService, public snackBar: MatSnackBar, public dialog: MatDialog) {
        this.vm.add([ValidatorEnum.email, ValidatorEnum.empty], 'mail');
        this.vm.add([ValidatorEnum.number, ValidatorEnum.empty], 'guess');
        this.vm.add([ValidatorEnum.number, ValidatorEnum.empty], 'guessGummy');
        this.vm.add([ValidatorEnum.number, ValidatorEnum.empty], 'guessMAndM');
    }

    checkIfMailExists(person, p) {
        if (person == null) {
            console.log(p);
            this.service.addGuess(p).subscribe();
        } else {
            this.errorResponse = 'Email already used';
            if (this.errorResponse.length !== 0) {
                this.openSnackBar(this.errorResponse);
            }
        }
        this.mail = null;
        this.guess = null;
        this.name = null;
    }

    check() {
        const mailReg = new RegExp(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const numberReg = new RegExp(/^[0-9]+$/);
        if (!numberReg.test(String(this.guess)) && this.guess !== undefined) {
            this.guess = Number(this.guess.toString().slice(0, this.guess.toString().length - 1));
        }

        const dialogRef = this.dialog.open(DialogCompComponent, {
            width: '250px',
            data: this.name
        });
        dialogRef.afterClosed().subscribe(item => {
            if (mailReg.test(this.mail) && numberReg.test('' + this.guess + '')) {
                const p: Person = new Person(this.name, this.mail, this.guess, this.guessGummy, this.guessMAndM);
                let person: Person;
                this.service.getSpecificPerson(p).subscribe(data => {
                    person = <Person>data;
                    this.checkIfMailExists(person, p);
                });
            } else {
                if (this.guess !== undefined && this.name !== undefined && this.mail !== undefined && this.guessMAndM !== undefined && this.guessGummy !== undefined) {
                    if ((this.guess < 1 && Math.floor(this.guess) !== this.guess) &&
                        (this.guessGummy < 1 && Math.floor(this.guessGummy) !== this.guessGummy) &&
                        (this.guessMAndM < 1 && Math.floor(this.guessMAndM) !== this.guessMAndM)) {
                        this.errorResponse = 'Number not valid';
                    }
                    if (!mailReg.test(this.mail)) {
                        this.errorResponse = 'Email not valid';
                    }
                } else {
                    this.errorResponse = 'No inputs given';
                }
            }
            if (this.errorResponse.length !== 0) {
                this.openSnackBar(this.errorResponse);
            } else {
                this.name = '';
                this.guess = null;
                this.mail = '';
                this.guessGummy = null;
                this.guessMAndM = null;
            }
        });
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, 'OK', {
            panelClass: ['error-snackbar']
        });
        this.errorResponse = '';
    }
}
