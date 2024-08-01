// home.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group/group.service';

import * as $ from 'jquery';  // Import jQuery

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  groupForm!: FormGroup;

  constructor(private fb: FormBuilder, private groupService: GroupService, private router: Router) {
    this.groupForm = this.fb.group({
      groupName: ['', Validators.required],
      groupCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // onSubmit(): void {
  //   if (this.groupForm.valid) {
  //     const formValues = this.groupForm.value;
  //     this.groupService.setGroupName(formValues.groupName);
  //     this.groupService.setGroupCode(formValues.groupCode);
  //     console.log('Group Name:', formValues.groupName);
  //     console.log('Group Code:', formValues.groupCode);
  //     // Close the modal after submitting the form
  //     // $('#groupModal').modal('hide');
  //          // Navigate to the chat component
  //          this.router.navigate(['/chat']);
  //   }
  // }
}
