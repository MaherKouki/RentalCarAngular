import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.css'
})
export class PostCarComponent {

  postCarForm!:FormGroup;

  isSpinning:boolean =false;
  selectedFile!: File |null;
  imagePreview!:string | ArrayBuffer | null;

  listOfOption: Array<{label:string ; value:string }>=[];
  listOfBrands = ["BMW", "AUDI", "MERCEDES", "VOLVO", "FORD", "TESLA", "TOYOTA", "HONDA", "CHEVROLET", "NISSAN","GOLF", "POLO", "PASSAT"];
  listOfType =["Essence" , "Diesel" , "Electric" , "Hybrid"];
  listOfColor =["Red", "White", "Blue", "Black", "Silver", "Grey", "Green", "Yellow", "Orange", "Brown"];
  listOfTransmission =["Manual" , "Automatic"];


  constructor(private fb: FormBuilder,
    private adminService:AdminService,
    private message:NzMessageService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.postCarForm = this.fb.group({
      name : [null,[Validators.required]],  ///lezm l'import mte3 validators
      brand:[null,[Validators.required]],
      type:[null,[Validators.required]],
      color:[null,[Validators.required]],
      transmission:[null,[Validators.required]],
      price:[null,[Validators.required]],
      description:[null,[Validators.required]],
      year: [null,[Validators.required]],
      
    })
  }

  postCar() {
    console.log(this.postCarForm.value);
    this.isSpinning = true;
    const formData: FormData = new FormData();

    if (this.selectedFile) formData.append('image', this.selectedFile);
    formData.append('brand', this.postCarForm.get('brand')?.value);
    formData.append('name', this.postCarForm.get('name')?.value);
    formData.append('type', this.postCarForm.get('type')?.value);
    formData.append('color', this.postCarForm.get('color')?.value);
    formData.append('year', this.postCarForm.get('year')?.value);
    formData.append('transmission', this.postCarForm.get('transmission')?.value);
    formData.append('description', this.postCarForm.get('description')?.value);
    formData.append('price', this.postCarForm.get('price')?.value);

    // Log each field of formData
    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    this.adminService.postCar(formData).subscribe(
        (res) => {
            console.log("Response from server:", res);
            this.isSpinning = false;
            this.message.success("Car posted successfully", { nzDuration: 5000 });
            this.router.navigateByUrl("/admin/dashboard");
        },
        (error) => {
            console.error("Error:", error);
            this.isSpinning = false;
            this.message.error("Error while posting car", { nzDuration: 5000 });
        }
    );
}


  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    if (this.selectedFile) {  // Add this check to ensure selectedFile is not null
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
  
      reader.readAsDataURL(this.selectedFile);
    }
  }

  disabledFutureDates = (current: Date): boolean => {
    const currentYear = new Date().getFullYear();
    return current > new Date(currentYear, 11, 31);
};

}
