import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
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

  constructor(
    private fb: FormBuilder,
    private service: CustomerService,
    private message: NzMessageService
  ) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null],
    });
  }
  
  searchCar() {
    this.isSpinning = true;
    // Réinitialiser `this.cars` pour éviter les doublons.
    this.cars = [];
  
    // Appel au service pour rechercher des voitures.
    this.service.searchCar(this.searchCarForm.value).subscribe({
      next: (res) => {
        // Traiter les résultats plus efficacement.
        this.cars = res.carDtoList.map((car: { returnedImage: string }) => ({
          ...car,
          processedImg: `data:image/png;base64,${car.returnedImage}`, // Transformation directe avec `map`.
        }));
      },
      error: (err) => {
        this.message.error('Failed to fetch cars. Please try again later.');
      },
      complete: () => {
        this.isSpinning = false;
      },
    });
  }

}
