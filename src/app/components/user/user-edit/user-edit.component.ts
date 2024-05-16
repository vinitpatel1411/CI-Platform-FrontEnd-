import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CurrentUserDTO } from '../../../models/user-models';
import { UserService } from '../../../services/user.service';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
    selector: 'app-user-edit',
    standalone: true,
    templateUrl: './user-edit.component.html',
    styleUrl: './user-edit.component.css',
    imports: [HeaderComponent,MatCardModule, MatButtonModule, MatDividerModule,MatFormFieldModule, MatInputModule,
      MatSelectModule,MatListModule]
})

export class UserEditComponent {
  userData: CurrentUserDTO;

  constructor(private userService: UserService){
    this.userData = userService.currentUserValue();
  }
}
