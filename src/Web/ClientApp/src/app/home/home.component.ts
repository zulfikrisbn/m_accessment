import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table";
import { CreateFreelancerCommand, FreelancerDto, FreelancersClient, UpdateFreelancerCommand } from '../web-api-client';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './dialog/register/register.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewFreelancerComponent } from './dialog/view-freelancer/view-freelancer.component';
import { ConfirmComponent } from './dialog/confirm/confirm.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'phoneNo',
    'skillSets',
    'hobby',
    'action'
  ];

  dataSource = new MatTableDataSource<FreelancerDto>();
  registeredData: FreelancerDto = new FreelancerDto();
  pageEvent: PageEvent;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private freelancerClient: FreelancersClient,
    public dialog: MatDialog,
    public viewdialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.refresh();
    // this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '50%'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const command = new CreateFreelancerCommand();
        command.username = result.username;
        command.email = result.email;
        command.phoneNo = result.phoneNo;
        command.skillSets = result.skillSets;
        command.hobby = result.hobby;
        this.freelancerClient.createFreelancer(command).subscribe(response => {
          this.snackBar.open('Registration Successful!', 'Ok', {
            duration: 3000
          });
        })
      }
    }, error => {
      this.snackBar.open(error, 'Ok', {
        duration: 3000
      });
    });
  }

  openViewDialog(id: number) {
    this.freelancerClient.getFreelance(id).subscribe(response => {
      if (response) {
        const viewdialogRef = this.viewdialog.open(ViewFreelancerComponent, {
          width: '50%',
          data: response
        })

        viewdialogRef.afterClosed().subscribe(result => {
          const command = new UpdateFreelancerCommand();
          command.id = response.id;
          command.username = response.username;
          command.phoneNo = response.phoneNo;
          command.email = response.email;
          command.skillSets = response.skillSets;
          command.hobby = response.hobby;
          this.freelancerClient.updateFreelancer(command).subscribe(x => {
            this.refresh();
            this.snackBar.open('Update Successful!', 'Ok', {
              duration: 3000
            });
          });
        });
      }
    }, error => {
      this.snackBar.open(error, 'Ok', {
        duration: 3000
      });
    });
  }

  refresh(first: boolean = true) {
    this.freelancerClient.getFreelancersWithPagination(this.pageIndex + 1, this.pageSize).subscribe(response => {
      this.dataSource.data = response.items;
      if (first)
        this.length = response.totalCount;
    });
  }

  delete(id: number) {
    const dialogRef = this.viewdialog.open(ConfirmComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.freelancerClient.deleteFreelancer(id).subscribe(res => {
          this.refresh();
          this.snackBar.open('User Removed!', 'Ok', {
            duration: 3000
          });
        });
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.refresh(false);
  }
}