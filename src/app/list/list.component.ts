import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/auth.service';
import { HttpService } from '../services/http.service';
import { Book } from './Book';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  isAdmin = true;

  books:Book[]=[];

  errorMessage:String;
  isForbidden:Boolean = false;

  constructor(private _httpService: HttpService, private authService:AuthenticationService,private _router:Router) { }

  ngOnInit() {
    this.getBooks();

  }
  getBooks(){
    this.books = [];
    this._httpService.getBooks().subscribe((data:any) =>{
      console.log(data);

      for(let i = 0;i<data.responseObject.length;i++){
        this.books[i]=data.responseObject[i];
      }
      console.log("books",this.books);
      
    },() => {
      alert("You do not have admin previlleges.Contact your administration.");
      this.errorMessage = "forbidden";
      this.isForbidden = true;
    });      
  }

  deleteBook(bookId:Number){
    this._httpService.deleteBookById(bookId).subscribe((data:any) =>{
      this.getBooks();
      this.isForbidden = false;
    },() => {
      alert("You do not have admin previlleges.Contact your administration.");
      this.errorMessage = "forbidden";
      this.isForbidden = true;
    });      
  }

  logoutHandler(){
    this.authService.logout();
    this._router.navigate(['/login']);
  }



}
