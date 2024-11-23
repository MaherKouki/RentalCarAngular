import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  cars: any[] = []; // Initialisation en tant que tableau vide

  constructor(private adminService: AdminService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getAllCars();
  }

  /*getAllCars() {
    this.adminService.getAllCars().subscribe((res) => {
      console.log(res);
      res.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/png;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    });
  }



  deleteCar(id: number){
    console.log(id);
    this.adminService.deleteCar(id).subscribe((res)=>{
      this.getAllCars();
      this.message.success("Car deleted successfully" ,{nzDuration: 5000 });
    },
    (err) => {
      
      this.message.error("Failed to delete car", { nzDuration: 5000 });
      console.error('Error deleting car:', err);
    }
  );
  }*/

  getAllCars() {
    this.adminService.getAllCars().subscribe((res) => {
      // Reset the cars array before populating it with new data
      this.cars = [];
      res.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/png;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    });
  }
  
  deleteCar(id: number) {
    console.log(id);
    this.adminService.deleteCar(id).subscribe(
      (res) => {
        this.getAllCars();  // Reload the cars after deletion
        this.message.success('Car deleted successfully', { nzDuration: 5000 });
      },
      (err) => {
        this.message.error('Failed to delete car', { nzDuration: 5000 });
        console.error('Error deleting car:', err);
      }
    );
  }
  


}
