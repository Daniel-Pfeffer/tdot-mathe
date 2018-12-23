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
    errorResponse: string;
    maximumNumber: number;

    // validator manager
    vm = new ValidatorManager();

    // validator types
    emailType = ValidatorEnum.email;
    numberType = ValidatorEnum.number;
    emptyType = ValidatorEnum.empty;

    constructor(private service: RestService, public snackBar: MatSnackBar) {
        this.vm.add([ValidatorEnum.email, ValidatorEnum.empty], 'mail');
        this.vm.add([ValidatorEnum.number, ValidatorEnum.empty], 'guess');
    }

    check() {
        const mailReg = new RegExp(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const numberReg = new RegExp(/^[0-9]+$/);
        if (!numberReg.test(String(this.guess))) {
            this.guess = Number(this.guess.toString().slice(0, this.guess.toString().length - 1));
        }
        console.log(this.guess);
        if (mailReg.test(this.mail) && numberReg.test('' + this.guess + '')) {
            if (!this.service.getSpecificPerson(this.mail).subscribe(item => {
                return item != null;
            })) {
                const p: Person = new Person(this.name, this.mail, this.guess);
                this.service.addGuess(p);
            } else {
                this.errorResponse = 'Email already used';
            }
        } else {
            if (this.guess < 1 && this.maximumNumber < this.guess && Math.floor(this.guess) !== this.guess) {
                this.errorResponse = 'Number not valid';
            }
            if (!mailReg.test(this.mail)) {
                this.errorResponse = 'Email not valid';
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
    }
}
