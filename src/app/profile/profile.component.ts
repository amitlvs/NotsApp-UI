import { environment } from './../../environments/environment.development';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PROFILE_DEFAULT, VERIFIED_ICON } from '../constants/image-constants';
import { DomSanitizer } from '@angular/platform-browser';
import AWSS3UploadAshClient from 'aws-s3-upload-ash';
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
  profileDefault: any = PROFILE_DEFAULT;
  verifiedIcon = VERIFIED_ICON;
  // ANGULAR_APP_S3_BUCKET = 'notsapp2';
  // ANGULAR_APP_ACCESS_KEY = 'AKIAYQQGQWSAA2GEZA7W';
  // ANGULAR_APP_SECRET_KEY = '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';
  // ANGULAR_APP_REGION = 'ap-south-1';
  awsConfig: any = {
    bucketName: environment.ANGULAR_APP_S3_BUCKET,
    dirName: 'media',
    region: environment.ANGULAR_APP_REGION,
    accessKeyId: environment.ANGULAR_APP_ACCESS_KEY,
    secretAccessKey: environment.ANGULAR_APP_SECRET_KEY,
  };
  S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(
    this.awsConfig
  );

  // myS3Bucket = new S3({
  //   params: {
  //     Bucket: this.ANGULAR_APP_S3_BUCKET,
  //   },
  //   region: this.ANGULAR_APP_REGION,
  // });
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.profileForm = this.fb.group({
      userName: [''],
      status: [''],
      phoneNumber: [''],
    });
  }
  handleUpload(e: any) {
    const file = e.target.files[0];
    // const params = {
    //   ACL: 'public-read',
    //   Body: file,
    //   Bucket: this.ANGULAR_APP_S3_BUCKET,
    //   Key: `${file.name}-${Date.now()}`,
    // };
    // this.myS3Bucket.upload(params, (err: any, ec2data: any) => {
    //   if (err) {
    //   }
    //   this.profileDefault = ec2data.Location;
    // });
    const profile = URL.createObjectURL(file);
    // to sanitise the url if it's unsafe
    let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(profile);
    this.profileDefault = sanitizedUrl;
  }
  setProfile() {
    this.profileDefault = PROFILE_DEFAULT;
  }
  ngOnInit(): void {
    // S3.config.update({
    //   accessKeyId: this.ANGULAR_APP_ACCESS_KEY,
    //   secretAccessKey: this.ANGULAR_APP_SECRET_KEY,
    // });

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
