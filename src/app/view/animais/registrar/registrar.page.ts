import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Animais } from 'src/app/model/entities/Animais';
import { AuthService } from 'src/app/model/service/auth.service';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/common/alert.service';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  especie!: string;
  nome!: string;
  genero!: number;
  peso!: number;
  saude!: number;
  public imagem! : any;
  public user! : any;
  formRegistrar : FormGroup;

  constructor(private alert: AlertService, private router: Router, private firebase: FirebaseService, private auth : AuthService, private formBuilder : FormBuilder)  {
      this.user = this.auth.getUserLogged();
      this.formRegistrar = new FormGroup({
        especie: new FormControl(''),
        nome: new FormControl(''),
        genero: new FormControl(''),
        peso: new FormControl(''),
        saude: new FormControl('')
      })
    }


  ngOnInit() {
    this.formRegistrar = this.formBuilder.group({
      especie: ['',[Validators.required, Validators.min(3), Validators.max(12)]],
      nome: ['',[Validators.required, Validators.min(3)]],
      genero: ['',[Validators.required]],
      peso: [''],
      saude: ['']
    })
  }

  registrar(){
    if(!this.formRegistrar.valid){
      this.alert.presentAlert("Erro", "Campos Obrigatórios!");
    }else if(this.formRegistrar.value['especie'] <=2 || this.formRegistrar.value['nome'] <=2){
      this.alert.presentAlert("Erro", "Espécie e nome devem ter pelo menos 3 letras");
    }else if(this.formRegistrar.value['peso']<1){
      this.alert.presentAlert("Erro", "Peso não pode ser 0 ou negativo");
    }else{
      let novo : Animais = new Animais(this.formRegistrar.value['especie'], this.formRegistrar.value['nome'], this.formRegistrar.value['genero']);
      novo.peso = this.formRegistrar.value['peso'];
      novo.saude= this.formRegistrar.value['saude'];
      novo.uid = this.user.uid;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo);
      }else{
        this.firebase.create(novo);
      }
      this.alert.presentAlert("Sucesso", "Animal registrado!");
      this.router.navigate(["/home"]);
    }
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files
  }

}
