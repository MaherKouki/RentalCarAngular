import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.css'
})
export class SearchCarComponent {

  searchCarForm!:FormGroup;
  listOfOption: Array<{label:string ; value:string }>=[];
  listOfBrands = ["BMW", "AUDI", "MERCEDES", "VOLVO", "FORD", "TESLA", "TOYOTA", "HONDA", "CHEVROLET", "NISSAN","GOLF", "POLO", "PASSAT"];
  listOfType =["Essence" , "Diesel" , "Electric" , "Hybrid"];
  listOfColor =["Red", "White", "Blue", "Black", "Silver", "Grey", "Green", "Yellow", "Orange", "Brown"];
  listOfTransmission =["Manual" , "Automatic"];
  isSpinning= false;
  cars: any[] = [];

  

  constructor(private fb:FormBuilder,
    private service:AdminService,
    private message: NzMessageService
  ){
    this.searchCarForm = this.fb.group({
      brand:[null],
      type:[null],
      transmission:[null],
      color:[null],
    })
  }

  searchCar(){
    this.isSpinning=true;
    
    this.service.searchCar(this.searchCarForm.value).subscribe((res)=> {
      res.carDtoList.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/png;base64,' + element.returnedImage;
        this.cars.push(element);
      });
      this.isSpinning = false;
    })
  }


 
}
