import { NgModule } from '@angular/core';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [HttpClientModule, FormsModule, RouterModule], 
  imports: [HttpClientModule, FormsModule, RouterModule], 
})
export class SharedModule {}