import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, SharedModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  
  email: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) {
    this.email = '';
    this.password = '';
  }

  delete(){

    const options = {
      body: {
        email: this.email,
        password: this.password
      }
    }

    this.http.delete('http://localhost:3000/delete', options).subscribe(
      (res:any) => {
        if (res.status === 200 || res === true){
          alert("delete successful");
          this.router.navigateByUrl('/login');
        } else alert("delete cannot be done");
      },
      error => {
        alert("invalid credentials");
      }
    );
  }
}
