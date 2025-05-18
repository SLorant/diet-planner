import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(), provideFirebaseApp(() => initializeApp({"projectId":"diet-planner-webkert","appId":"1:110858111654:web:5d56eb815abfb767044267","storageBucket":"diet-planner-webkert.firebasestorage.app","apiKey":"AIzaSyBdPsZYTPEqIi-Q4TE0hUowAPn6wzQRbE0","authDomain":"diet-planner-webkert.firebaseapp.com","messagingSenderId":"110858111654"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
}).catch((err) => console.error(err));
