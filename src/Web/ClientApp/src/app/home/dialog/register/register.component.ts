import { COMMA, ENTER, SPACE, TAB } from '@angular/cdk/keycodes';
import { Component, Inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { CheckUsernameCommand, FreelancerDto, FreelancersClient } from 'src/app/web-api-client';

export interface Skill {
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  data: FreelancerDto = new FreelancerDto;
  addOnBlur = true;
  skills: Skill[] = [];
  isUsernameExist = false;
  isUsernameLoading = false;
  readonly separatorKeysCodes = [ENTER, COMMA, TAB] as const;

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private freelancerClient: FreelancersClient
  ) { }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.skills.push({ name: value });
    }

    event.chipInput!.clear();
  }

  remove(fruit: Skill): void {
    const index = this.skills.indexOf(fruit);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  edit(fruit: Skill, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(fruit);
      return;
    }

    const index = this.skills.indexOf(fruit);
    if (index >= 0) {
      this.skills[index].name = value;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onRegister(): void {
    this.data.skillSets = this.skills.map(fruit => fruit.name);
    this.dialogRef.close(this.data);
  }

  checkUsername(user: string) {
    this.isUsernameLoading = true;
    const command = new CheckUsernameCommand();
    command.username = user;
    this.freelancerClient.checkUsername(command).subscribe(response => {
      this.isUsernameLoading = false;
      if (response) {
        this.isUsernameExist = true;
      }
      else {
        this.isUsernameExist = false;
      }
    })
  }
}
