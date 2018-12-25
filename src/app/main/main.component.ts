import {Component} from '@angular/core';
import {ValidatorEnum, ValidatorManager} from '../validatorManager';
import {RestService} from '../rest.service';
import {Person} from '../person';
import {MatSnackBar} from '@angular/material';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent {
    // ngModels
    mail: string;
    name: string;
    guess: number;
    errorResponse = '';
    maximumNumber: number;

    // validator manager
    vm = new ValidatorManager();

    // validator types
    emailType = ValidatorEnum.email;
    emptyType = ValidatorEnum.empty;

    constructor(private service: RestService, public snackBar: MatSnackBar) {
        this.vm.add([ValidatorEnum.email, ValidatorEnum.empty], 'mail');
        this.vm.add([ValidatorEnum.number, ValidatorEnum.empty], 'guess');
    }

    checkIfMailExists(person, p) {
        if (person == null) {
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
        if (mailReg.test(this.mail) && numberReg.test('' + this.guess + '')) {
            const p: Person = new Person(this.name, this.mail, this.guess);
            let person: Person;
            this.service.getSpecificPerson(p).subscribe(data => {
                person = <Person>data;
                this.checkIfMailExists(person, p);
            });
        } else {
            if (this.guess !== undefined && this.name !== undefined && this.mail !== undefined) {
                if (this.guess < 1 && this.maximumNumber < this.guess && Math.floor(this.guess) !== this.guess) {
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
        }
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, 'OK', {
            panelClass: ['error-snackbar']
        });
        this.errorResponse = '';
    }
}
