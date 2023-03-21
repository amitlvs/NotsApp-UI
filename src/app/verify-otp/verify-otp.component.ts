import { Router } from '@angular/router';
import { OtpServiceService } from './../../services/otp-service.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent {
  verifyForm!: FormGroup;
  btnText:String="Verify Otp";
  otp:String="";
  constructor(private fb:FormBuilder,private otpService:OtpServiceService,private router:Router){
    this.verifyForm = this.fb.group({
      otp1: ['',[Validators.required, Validators.maxLength(1)]],
      otp2: ['', [Validators.required, Validators.maxLength(1)]],
      otp3: ['', [Validators.required, Validators.maxLength(1)]],
      otp4: ['', [Validators.required, Validators.maxLength(1)]],
      otp5: ['', [Validators.required, Validators.maxLength(1)]],
      otp6: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }
  tabChange(val: any) {
    let ele = document.querySelectorAll('input');
    if (val == 1) {
      if (ele[val - 1].value != '') {
        ele[val].focus();
      }
    } else {
      if (val < 10) {
        if (ele[val - 1].value != '') {
          ele[val].focus();
        } else if (ele[val - 1].value == '') {
          ele[val - 2].focus();
        }
        let num = '';
        ele.forEach((element) => {
          num += element.value;
        });
      } else if (val == 10 && ele[val - 1].value == '') {
        ele[val - 2].focus();
      }
    }
  }

  pasteValue(e:any,input:any){
    console.log(e);
    let elsInput = document.querySelectorAll("input");
    const clip = e.clipboardData.getData('text');     // Get clipboard data
    const pin = clip.replace(/\s/g, "");               // Sanitize string
    const ch = [...pin];                               // Create array of chars
    elsInput.forEach((el, i) => el.value = ch[i]??""); // Populate inputs
    elsInput[pin.length - 1].focus(); 
  }

  onVerify(){
    console.log("hola");
    this.otp = 
    this.verifyForm.controls["otp1"].value + 
    this.verifyForm.controls["otp2"].value + 
    this.verifyForm.controls["otp3"].value + 
    this.verifyForm.controls["otp4"].value + 
    this.verifyForm.controls["otp5"].value + 
    this.verifyForm.controls["otp6"].value ;
    console.log(this.otp);
    
    this.otpService.numberOtp.subscribe(res => {
      console.log(res);
      const phNumber = res?.Details.phone;
      this.otpService.verifyOtp(phNumber,this.otp).subscribe(res => {
        console.log(res);
        localStorage.setItem('userToken',JSON.stringify(res))
        if(res){
          this.router.navigateByUrl("profile")
        }
        
      })
     
      
    })

    
  }

}
