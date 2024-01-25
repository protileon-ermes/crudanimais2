import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Animais } from 'src/app/model/entities/Animais';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { AuthService } from 'src/app/model/service/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/common/alert.service';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  animal! : Animais;
  especie!: string;
  nome!: string;
  genero!: number;
  peso!: number;
  saude!: number;
  edicao : boolean = true;
  public imagem! : any;
  user : any;
  formEditar: FormGroup;

  constructor(private firebase: FirebaseService, private router: Router, private alert: AlertService, private auth : AuthService, private FormBuilder:FormBuilder) {
    this.user = this.auth.getUserLogged();
    this.formEditar = new FormGroup({
      especie: new FormControl(''),
      nome: new FormControl(''),
      genero: new FormControl(''),
      peso: new FormControl(''),
      saude: new FormControl('')
    });
   }

  ngOnInit() {
    this.animal=history.state.animal;
    this.formEditar = this.FormBuilder.group({
      especie: [this.animal.especie, [Validators.required]],
      nome: [this.animal.nome, [Validators.required]],
      genero: [this.animal.genero, [Validators.required]],
      peso: [this.animal.peso],
      saude: [this.animal.saude]
    });
  }
  PermitirEdicao(){
    if(this.edicao){
      this.edicao=false;
    }else{
      this.edicao=true;
    }
  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }


  editar(){
    if(!this.formEditar.valid){
      this.alert.presentAlert("Erro", "Campos Obrigatórios!");
    }else{
      let novo : Animais = new Animais(this.formEditar.value['especie'], this.formEditar.value['nome'], this.formEditar.value['genero']);
      novo.peso = this.formEditar.value['peso'];
      novo.saude= this.formEditar.value['saude'];
      novo.id = this.animal.id;
      novo.uid = this.user.uid;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo);
      }else{
        this.firebase.update(novo, this.animal.id);
      }
      this.alert.presentAlert("Sucesso", "Animal editado!");
      this.router.navigate(["/home"]);
    }
  }

  excluir(){
    this.firebase.delete(this.animal.id);
    this.router.navigate(['/home']);
  }

}
