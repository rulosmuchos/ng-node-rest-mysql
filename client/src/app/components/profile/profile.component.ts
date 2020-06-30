import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpEvent } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  edit: boolean = false;
  selectedFile:File

  progress: number = 0;
  constructor(
    private http:HttpClient
  ) { 
  }
  profile: Object = {
    username: '',
    password: '',
    image: '',
    whapp:'',
    created_at: new Date()
  };

  ngOnInit(): void {
  }
  onFileChanged(comp_event) {
    this.selectedFile = comp_event.target.files[0];
    let input = new FormData();
    // Add your values in here
    input.append('file', this.selectedFile);
    this.http.post('https://app.avellanedacompras.com/upload', input, {
      reportProgress: true,
      observe: 'events'}).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            break;
          case HttpEventType.ResponseHeader:
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            break;
          case HttpEventType.Response:
            setTimeout(() => {
              console.log(comp_event);
              this.profile[comp_event.target.name] = event.body['filename'];
              this.progress = 0;
            }, 1500);
  
        }
      });
    }
}
