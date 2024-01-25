import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public formCadastrar! : FormGroup;

  constructor(private alert : AlertService,
    private authService : AuthService,
    private router : Router, private formBuilder : FormBuilder) {
      this.formCadastrar = new FormGroup({
        email: new FormControl(''),
        senha: new FormControl(''),
        confSenha: new FormControl(' ')
      });
     }

  ngOnInit() {
    this.formCadastrar = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl(){
    return this.formCadastrar.controls;
  }

  submitForm() : boolean {
    if(!this.formCadastrar.valid){
      this.alert.presentAlert('Erro', 'Erro ao Prencher!');
      return false;
    }else{
      this.cadastrar();
      return true;
    }
  }

  private cadastrar() : void{
    this.authService.signUpWithEmailPassword(this.formCadastrar.value['email'],
     this.formCadastrar.value['senha']).then((res)=>{
      this.alert.presentAlert('Sucesso', 'Cadastro Realizado!');
      this.router.navigate(["/signin"]);
     })
     .catch((error)=>{
      this.alert.presentAlert('Erro', 'Erro ao realizar Cadastro!');
      console.log(error.message);
     })
  }

}