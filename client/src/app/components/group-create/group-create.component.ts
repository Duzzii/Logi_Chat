// group-create.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent implements OnInit {
  groupForm!: FormGroup;

  constructor(private fb: FormBuilder, private groupService: GroupService, private router: Router) {
    this.groupForm = this.fb.group({
      groupName: ['', Validators.required],
      groupCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.groupForm.valid) {
      const formValues = this.groupForm.value;
      this.groupService.setGroupName(formValues.groupName);
      this.groupService.setGroupCode(formValues.groupCode);
      console.log('Group Name:', formValues.groupName);
      console.log('Group Code:', formValues.groupCode);
      // Navigate to the chat component
      this.router.navigate(['/chat']);
    }
  }
}
