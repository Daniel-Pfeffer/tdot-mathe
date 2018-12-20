import {Component} from '@angular/core';
import {ValidatorEnum, ValidatorManager} from '../validatorManager';
import {RestService} from '../rest.service';
import {Person} from '../person';

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

    // validator manager
    vm = new ValidatorManager();

    // validator types
    emailType = ValidatorEnum.email;
    numberType = ValidatorEnum.number;
    emptyType = ValidatorEnum.empty;

    constructor(private service: RestService) {
        this.vm.add([ValidatorEnum.email, ValidatorEnum.empty], 'mail');
        this.vm.add([ValidatorEnum.number, ValidatorEnum.empty], 'guess');
    }

    check() {
        const mailReg = new RegExp(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const mailNumber = new RegExp(/^[0-9]+$/);
        if (!mailNumber.test(String(this.guess))) {
            this.guess = Number(this.guess.toString().slice(0, this.guess.toString().length - 1));
        }
        console.log(this.guess);
        if (mailReg.test(this.mail)) {
            if (!this.service.getSpecificPerson(this.mail).subscribe(item => {
                return item != null;
            })) {
                const p: Person = new Person(this.name, this.mail, this.guess);
            }
        }
    }

}
