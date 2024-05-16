import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
    selector: 'app-user-edit',
    standalone: true,
    templateUrl: './user-edit.component.html',
    styleUrl: './user-edit.component.css',
    imports: [HeaderComponent,MatCardModule, MatButtonModule]
})
export class UserEditComponent {

}
