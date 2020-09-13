import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fsup';
  image;

  constructor(
    private http: HttpClient
  ){}

  // tslint:disable-next-line: typedef
  onSelectImage(event){
    if (event.target.files.length > 0){
      const image = event.target.files[0];
      this.image = image;
      console.log(event.target.files.length);
    }
  }

  // tslint:disable-next-line: typedef
  onSave(){
    const formData = new FormData();
    formData.append('file', this.image);
    formData.append('name', 'abid hasan');
    this.http.post<any>('http://localhost:3000/upload', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
