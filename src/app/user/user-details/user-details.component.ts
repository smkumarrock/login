import { Component, OnInit } from '@angular/core';
import { ServiceService } from "./../../service.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user_data;
  user_profile;
  constructor(private service: ServiceService) { }

  ngOnInit() {
    var token = localStorage.getItem('access_token');
    console.log(token);
    this.service.getUserDetails().subscribe(data=>{
      console.log(data);
      this.user_data = data;
      this.getUserProfile(this.user_data.profile)
    })
  }
  
  getUserProfile(profile){
    console.log('profile recived');
    this.service.getUserProfile(profile).subscribe(data=>{
      
      console.log(data);
      this.user_profile = data;
    })
  }

}
