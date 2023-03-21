import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userName = '';
  emailId = '';
  phoneNumber = '';
  userData: any;
  profileForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      userName: [''],
      status: [''],
      phoneNumber: [''],
    });
  }
  handleUpload(e: any) {
    const file = e.target.files[0];
    const profile = URL.createObjectURL(file);
    this.setProfile(profile);
  }
  setProfile(p: any) {
    return p;
  }
  ngOnInit(): void {
    let data = localStorage.getItem('userData');
    if (data) {
      this.userData = JSON.parse(data);
      this.profileForm.setValue({
        userName: this.userData.Details.phone,
        status: '',
        phoneNumber: this.userData.Details.phone,
      });
    }
  }
  uploadImage() {
    console.log('dhuh');
    // $(document).ready(function() {

    //   var readURL = function(input) {
    //       if (input.files && input.files[0]) {
    //           var reader = new FileReader();

    //           reader.onload = function (e) {
    //               $('.profile-pic').attr('src', e.target.result);
    //           }

    //           reader.readAsDataURL(input.files[0]);
    //       }
    //   }

    //   $(".file-upload").on('change', function(){
    //       readURL(this);
    //   });

    //   $(".upload-button").on('click', function() {
    //      $(".file-upload").click();
    //   });
    // });
  }
  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    this.profileForm.reset();
  }
}
