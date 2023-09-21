import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'
import 'firebase/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private router: Router, private toastCtrl: ToastController, private loadingCtrl: LoadingController,) {
    this.token = "";
  }
  private user: any;
  private nombre: any;
  public email: any;
  public token: string;

  public usuarioAutenticado: any;

  async login(email: string, password: string) {
    try {
      const validado = await firebase.auth().signInWithEmailAndPassword(email, password);
      this.showLoading('Ingresando');
      if (validado) {
        // Validation successful
        this.usuarioAutenticado = firebase.auth().currentUser;
        this.email = firebase.auth().currentUser?.email;
        this.router.navigateByUrl('home', { replaceUrl: true });
      } else {
        // Validation failed
        this.toastNotification('Llene ambos campos correo electrónico y clave');
      }
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          this.toastNotification('El usuario no se encuentra registrado.');
          break;
        case 'auth/wrong-password':
          this.toastNotification('Combinación de clave y correo electrónico errónea.');
          break;
        default:
          //this.toastNotification('Ocurrió un error durante el inicio de sesión.');
          console.log(error.message);
          break;
      }
    }
  }

  async toastNotification(mensaje: any) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'middle',
      icon: 'camera-reverse-outline',
      color: 'danger'
    });
    (await toast).present();
  }

  getIdToken() {
    return this.token;
  }

  estaLogeado() {
    if (this.usuarioAutenticado) {
      return true;
    }
    else {
      return false;
    }
  }
  logout() {
    firebase.auth().signOut().then(() => {
      this.token = "";
      this.router.navigateByUrl('log', { replaceUrl: true });
    });
  }
  async showLoading(mensaje: string) {
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 3000,
      translucent: true,
      cssClass: 'custom-loading'

    });
    loading.present();
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
  }
  async getEmail() {
    return firebase.auth().currentUser?.email;
  }
  async getUser() {
    return firebase.auth().currentUser
  }
  getEmailPrefix(email: string): string {
    const parts = email.split("@");
    return parts[0];
  }
  async uploadMensaje(mensaje: string) {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        throw new Error("Usuario no ingreso");
      }

      const mensajeRefCollection = firebase.firestore().collection('mensajes');
      const mensajeObj = {
        escritoPor: user.email,
        mensaje:mensaje,
        fecha: new Date().toLocaleString('es-AR'),
      };

      await mensajeRefCollection.add(mensajeObj);
    }
    catch (error) {
      console.log("Error subiendo mensaje:", error);
      throw error;
    }
  }
  async uploadMensajeB(mensaje: string) {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        throw new Error("Usuario no ingreso");
      }

      const mensajeRefCollection = firebase.firestore().collection('mensajesB');
      const mensajeObj = {
        escritoPor: user.email,
        mensaje:mensaje,
        fecha: new Date().toLocaleString('es-AR'),
      };

      await mensajeRefCollection.add(mensajeObj);
    }
    catch (error) {
      console.log("Error subiendo mensaje:", error);
      throw error;
    }
  }

  async getMensajesRefs(): Promise<any[]> {
    const mensajesRefCollection = firebase.firestore().collection('mensajes');
    const querySnapshot = await mensajesRefCollection.get();
    const mensajesRefs: any[] | PromiseLike<any[]> = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      mensajesRefs.push(data);
    });
    return mensajesRefs;
  }
  async getMensajesRefsB(): Promise<any[]> {
    const mensajesRefCollection = firebase.firestore().collection('mensajesB');
    const querySnapshot = await mensajesRefCollection.get();
    const mensajesRefs: any[] | PromiseLike<any[]> = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      mensajesRefs.push(data);
    });
    return mensajesRefs;
  }





  

}


