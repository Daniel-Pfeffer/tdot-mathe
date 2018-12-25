import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from './person';

@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private http: HttpClient) {
    }

    getData() {
        return this.http.get('http://localhost:8080/tdot/getAll');
    }

    addGuess(person: Person) {
        console.log('hi\nAdded a person: ' + person);
        return this.http.post('http://localhost:8080/tdot/addGuess', person);
    }

    getSpecificPerson(personToGet: Person) {
        return this.http.post('http://localhost:8080/tdot/getPerson', personToGet);
    }
}
