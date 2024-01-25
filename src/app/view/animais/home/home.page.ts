import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Animais } from 'src/app/model/entities/Animais';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { AuthService } from 'src/app/model/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  lista : Animais[]=[];
  public user: any;
  
  constructor(private firesabe : FirebaseService,
    private authService : AuthService,
    private router : Router) {
      this.user = this.authService.getUserLogged()
      console.log(this.user);
      this.firesabe.read(this.user.uid)
      .subscribe(res => {
        this.lista = res.map(animal =>{
          return{
            id: animal.payload.doc.id,
            ... animal.payload.doc.data() as any
          }as Animais;
        })
      })
    }
 
  irParaRegistro(){
    this.router.navigate(["/registrar"]);
  }
  irParaEditar(animal : Animais){
    this.router.navigateByUrl("/editar",{
      state: {animal: animal}});
  }

  logout(){
    this.authService.signOut().then((res)=>{
      this.router.navigate(["signin"]);
    })
  }
}
