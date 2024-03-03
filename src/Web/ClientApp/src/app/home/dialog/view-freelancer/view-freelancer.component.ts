import { ENTER, COMMA, SPACE, TAB } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckUsernameCommand, FreelancerDto, FreelancersClient } from 'src/app/web-api-client';

export interface Skill {
  name: string;
}

@Component({
  selector: 'app-view-freelancer',
  templateUrl: './view-freelancer.component.html',
  styleUrls: ['./view-freelancer.component.css']
})
export class ViewFreelancerComponent implements OnInit {
  skills: Skill[] = [];
  addOnBlur = true;
  isUsernameExist = false;
  isUsernameLoading = false;
  readonly separatorKeysCodes = [ENTER, COMMA, TAB] as const;

  constructor(
    public dialogRef: MatDialogRef<ViewFreelancerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FreelancerDto,
    private freelancerClient: FreelancersClient
  ) { }

  ngOnInit(): void {
    this.skills = this.data.skillSets.map(skillName => ({ name: skillName }));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.skills.push({ name: value });
    }

    // Clear the input value
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

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.skills.indexOf(fruit);
    if (index >= 0) {
      this.skills[index].name = value;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onUpdate(): void {
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
