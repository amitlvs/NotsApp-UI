import { OtpServiceService } from '../../services/otp-service.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.css'],
})
export class SendOtpComponent implements Validators {
  loginForm!: FormGroup;
  //not required for now
  verifyFlag: boolean = false;
  phNumber!: String;
  btnText: String = 'Send Otp';
  btnDisabled: boolean = true;
  submitted!: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private otpService: OtpServiceService
  ) {
    this.loginForm = this.fb.group({
      phnumber: [this.phNumber],
      ph1: [null, [Validators.required, Validators.maxLength(1)]],
      ph2: [null, [Validators.required, Validators.maxLength(1)]],
      ph3: [null, [Validators.required, Validators.maxLength(1)]],
      ph4: [null, [Validators.required, Validators.maxLength(1)]],
      ph5: [null, [Validators.required, Validators.maxLength(1)]],
      ph6: [null, [Validators.required, Validators.maxLength(1)]],
      ph7: [null, [Validators.required, Validators.maxLength(1)]],
      ph8: [null, [Validators.required, Validators.maxLength(1)]],
      ph9: [null, [Validators.required, Validators.maxLength(1)]],
      ph10: [null, [Validators.required, Validators.maxLength(1)]],
    });
  }
  onLogin() {
    if (this.loginForm.valid) {
      this.loginForm.controls['phnumber'].setValue(
        // parseInt(
        '+' +
          '91' +
          this.loginForm.controls['ph1'].value +
          this.loginForm.controls['ph2'].value +
          this.loginForm.controls['ph3'].value +
          this.loginForm.controls['ph4'].value +
          this.loginForm.controls['ph5'].value +
          this.loginForm.controls['ph6'].value +
          this.loginForm.controls['ph7'].value +
          this.loginForm.controls['ph8'].value +
          this.loginForm.controls['ph9'].value +
          this.loginForm.controls['ph10'].value
      );
      this.phNumber = this.loginForm.controls['phnumber'].value;
      this.otpService.getOtp(this.phNumber).subscribe((res) => {
        if (res) {
          this.otpService.numberOtp.next(res);
          localStorage.setItem('userData', JSON.stringify(res));
          this.router.navigateByUrl('verifyOtp');
        } else {
          console.warn('You have not satisfied the criteria');
        }
      });
    } else if (this.loginForm.invalid) {
      console.error('Check Form Values');
    }
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

  pasteValue(e: any, input: any) {
    let elsInput = document.querySelectorAll('input');
    const clip = e.clipboardData.getData('text'); // Get clipboard data
    const pin = clip.replace(/\s/g, ''); // Sanitize string
    const ch = [...pin]; // Create array of chars
    elsInput.forEach((el, i) => (el.value = ch[i] ?? '')); // Populate inputs
    elsInput[pin.length - 1].focus();
  }
}
