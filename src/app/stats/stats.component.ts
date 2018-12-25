import {Component, OnInit} from '@angular/core';
import {Person} from '../person';
import {RestService} from '../rest.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

    persons: Array<Person>;
    displayedColumns: string[] = ['name', 'mail', 'guess'];

    constructor(private service: RestService) {
    }

    ngOnInit(): void {
        this.service.getData().subscribe(data => {
            this.persons = <Array<Person>>data['personArray'];
            console.log(this.persons);
        });
    }
}
