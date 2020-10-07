import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
     public baseUrl:string = "http://localhost:9091";
    constructor(private http: HttpClient) { }

    login(username, password) {
        return this.http.post(this.baseUrl+'/login', { username: username, password: password });
    }

    getBooks(){
        return this.http.get(this.baseUrl+"/books");
    }

    deleteBookById(bookId:Number){
        let url = `http://localhost:9091/books/remove/${bookId}`;
        return this.http.delete(url);
    }
}