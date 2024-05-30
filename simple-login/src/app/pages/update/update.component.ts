import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, SharedModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

  email: string;
  password: string;
  new_password: string;

  constructor(private http: HttpClient, private router: Router){
    this.email = '';
    this.password = '';
    this.new_password = '';
  }

  update(){
    const updatedata = {
      body: {
        email: this.email,
        password: this.password,
        new_password: this.new_password
      }
    }

    this.http.put('http://localhost:3000/update', updatedata).subscribe(
      (res:any) => {
        if (res === true || res.status == 200) {
          alert("update successful! please log back in again");
          this.router.navigateByUrl('/login');
        } else alert("update could not be done");
      },
      error => {
        alert('invalid credentials');
      }
    );
  }
}
