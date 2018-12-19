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
        this.http.get('localhost:8080/getAll');
    }

    addGuess(person: Person) {
        this.http.put('locahost:8080/addGuess', person);
    }

    getSpecificPerson(mail: string) {
        return this.http.post('localhost:8080/getPerson', mail);
    }
}
