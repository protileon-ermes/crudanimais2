import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  public formLogar : FormGroup;

  constructor(private alert : AlertService,
    private authService: AuthService,
    private router : Router, private formBuilder : FormBuilder) {
      this.formLogar = new FormGroup({
        email: new FormControl(''),
        senha: new FormControl('')
      });
     }

  ngOnInit() {
    this.formLogar = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }  

  get errorControl(){
    return this.formLogar.controls;
  }

  submitForm() : boolean {
    if(!this.formLogar.valid){
      this.alert.presentAlert('Erro', 'Erro ao Prencher!');
      return false;
    }else{
      this.alert.simpleLoader();
      this.logar();
      return true;
    }
  }

  private logar(){
    this.authService
    .signIn(this.formLogar.value['email'],
     this.formLogar.value['senha'])
     .then((res)=>{
      setTimeout(() => {
        this.alert.dismissLoader();
        this.alert.presentAlert('Olá', 'Seja bem-vindo!');
        this.router.navigate(["/home"]);
      }, 1000);
     })
     .catch((error)=>{
      this.alert.dismissLoader();
      this.alert.presentAlert('Erro=', 'Email e/ou Senha Inválidas!');
      console.log(error.message);
     })
  }

  logarComGoogle(): void{
    this.authService.signInWithGoogle()
    .then((res)=>{
      setTimeout(() => {
        this.alert.presentAlert("opa", "bem vindo");
        this.router.navigate(["home"]);
      }, 1000);
    }).catch((error)=>{
      this.alert.presentAlert('Logar', 'erro');
      console.log(error);
    });
  }

  logarComGitHub(): void{
    this.authService.signInWithGitHub()
    .then((res)=>{
      setTimeout(() => {
        this.alert.presentAlert("opa", "bem vindo");
        this.router.navigate(["home"]);
      }, 1000);
    }).catch((error)=>{
      if (error.code === 'auth/account-exists-with-different-credential') {
        this.alert.presentAlert('Logar', 'esse email já está linkado com outro provider');
      } else {
        this.alert.presentAlert('Logar', 'erro');
      console.log(error);
      }
    });
  }

  irParaSignUp(){
    this.router.navigate(["/signup"]);
  }



}