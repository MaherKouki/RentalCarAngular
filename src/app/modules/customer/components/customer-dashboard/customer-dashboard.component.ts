import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {

  cars: any = [];


  constructor (private service:CustomerService){}


  ngOnInit(): void {
    this.getAllCars();
  }



  getAllCars() {
    this.service.getAllCars().subscribe((res) => {
      // Reset the cars array before populating it with new data
      //this.cars = [];
      //console.log(res);
      res.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/png;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    });
  }

}
