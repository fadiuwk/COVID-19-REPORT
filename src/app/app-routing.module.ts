import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ReportComponent } from './report/report.component';



const routes: Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full'} ,
  {path:'home' , component:NavbarComponent} ,
  {path:'report' , component:ReportComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
