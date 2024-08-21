import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChatComponent } from './pages/chat/chat.component';
import { GroupCreateComponent } from './components/group-create/group-create.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: GroupCreateComponent,},
  { path: 'home', component: HomeComponent },
  { path: 'sign-in',component: SigninComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'create-group', component: GroupCreateComponent, },
  { path: 'chat', component: ChatComponent,},
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
