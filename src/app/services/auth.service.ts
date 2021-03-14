import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: any = false;
  constructor(
    private angularFireAuth: AngularFireAuth,
    public alert: AlertController
  ) {
    angularFireAuth.authState.subscribe(user => this.isLogged = user);
  }

  async onLogin(user: User) {
    try {
      return await this.angularFireAuth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (error) {
      console.log('error :>> ', error);
      this.presentAlert({
        cssClass: '',
        header: 'Oppss',
        message: this.getError(error.code, error.message)
      });
    }
  }

  async onRegister(user: User) {
    try {
      return await this.angularFireAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (error) {
      console.log('error :>> ', error);
      this.presentAlert({
        cssClass: '',
        header: 'Oppss',
        message: this.getError(error.code, error.message)
      });
    }
  }

  async onLogout() {
    this.angularFireAuth.signOut();
  }

  async presentAlert(alertOptions) {
    const alert = await this.alert.create({
      cssClass: alertOptions.cssClass,
      header: alertOptions.header,
      message: alertOptions.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  getError(code, messageError) {
    let message = '';
    switch (code) {
      case 'auth/invalid-email':
        message = 'El correo electrónico no es valido';
        break;

      case 'auth/user-not-found':
        message = 'El correo electrónico no está registrado';
        break;
      case 'auth/wrong-password':
        message = 'La contraseña es incorrecta';
        break;
      case 'auth/email-already-in-use':
        message = 'Este correo electrónico ya esta en uso';
        break;
      default:
        message = `Ha ocurrido un error inesperado, contacte se con el administrador, ${code}, ${messageError}`;
        break;
    }
    return message;
  }
}
