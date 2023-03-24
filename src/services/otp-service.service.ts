import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OtpServiceService {
  baseUrl = "http://localhost:8000/api/v1/";
  numberOtp = new BehaviorSubject<any>({});
  constructor(private http:HttpClient) {}

  getOtp(phNumber:String){
    return this.http.post<any>(this.baseUrl + "generateOtp",{phone:phNumber})
  }
  verifyOtp(phNumber:String,Otp:String){
    return this.http.post<any>(this.baseUrl + "verifyOtp",{phone:phNumber,otp:Otp})
  }
}
