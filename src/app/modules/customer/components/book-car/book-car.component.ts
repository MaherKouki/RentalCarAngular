import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.css'
})
export class BookCarComponent {

  carId: number =this.activatedRoute.snapshot.params["id"];
  car:any;
  processedImage:any;
  validateForm!:FormGroup;
  isSpinning = false;
  dateFormat!:"DD-MM-YYYY";
  nn!:string;


  constructor(private service:CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb:FormBuilder,
    private message:NzMessageService,
    private router: Router
  ){}


  ngOnInit(){
    this.validateForm = this.fb.group({
      toDate:[null,Validators.required],
      fromDate:[null,Validators.required],
    })
    this.getCarById();
  }

  getCarById(){
    this.service.getCarById(this.carId).subscribe((res)=>{
      console.log(res);
      this.processedImage = 'data:image/png;base64,' + res.returnedImage;
      this.car =res;
    })
  }


  
  /*bookACar(data:any){
    console.log(data);
    this.isSpinning = true;
    let bookACarDto = {
      toDate : data.toDate,
      fromDate: data.fromDate,
      userId: StorageService.getUserId(),
      carId: this.carId
    }
    console.log("waaaaaaaaa", bookACarDto);
    console.log(bookACarDto.userId)
    console.log(bookACarDto.carId)
    this.service.bookACar(bookACarDto).subscribe((res) => {
      console.log(res);
      this.message.success("Booking request submitted successfully" , {nzDuration:5000});
      this.router.navigateByUrl("/customer/dashboard")
    },error=> {
      this.message.error("Something went wrong", {nzDuration:5000});
      
    }
  )
  }*/


/*
  bookACar(data: any): void {
    console.log(data);
    this.isSpinning = true;
  
    // Preparing the DTO to be sent
    const bookACarDto = {
      toDate: data.toDate,
      fromDate: data.fromDate,
      userId: StorageService.getUserId(), // Assuming this is getting the current user ID
      carId: this.carId
    };
    console.log("Booking Data:", bookACarDto);
  
    // Sending the booking data via service
    this.service.bookACar(bookACarDto).subscribe(
      (res) => {
        console.log(res);
        this.message.success("Booking request submitted successfully", { nzDuration: 5000 });
        this.router.navigateByUrl("/customer/dashboard");
        this.isSpinning = false; // Stop the loading spinner after success
      },
      (error) => {
        console.error(error); // Log the error to the console
        // Check for specific error messages or statuses
        if (error.status === 400) {
          this.message.error("Bad Request: Please check your input", { nzDuration: 5000 });
        } else if (error.status === 401) {
          this.message.error("Unauthorized: Please log in again", { nzDuration: 5000 });
        } else {
          this.message.error("Something went wrong, please try again", { nzDuration: 5000 });
        }
        this.isSpinning = false; // Stop the loading spinner after error
      }
    );
  }*/
  



    bookACar(data: any) {
      console.log(data);
      this.isSpinning = true;
      
      // Création du DTO pour l'appel API
      let bookACarDto = {
        toDate: data.toDate,
        fromDate: data.fromDate,
        userId: StorageService.getUserId(),
        carId: this.carId // carId est déjà inclus dans l'URL donc ne devrait pas être dans le body
      };
  
      console.log("waaaaaaaaa", bookACarDto);
      console.log(bookACarDto.userId);
      console.log(bookACarDto.carId);
  
      // Appel au service pour réserver la voiture
      this.service.bookACar(this.carId, bookACarDto).subscribe(
        (res) => {
          console.log(res);
          this.message.success("Booking request submitted successfully", {nzDuration: 5000});
          this.router.navigateByUrl("/customer/dashboard");
        },
        (error) => {
          this.message.error("Something went wrong", {nzDuration: 5000});
        }
      );
  }
  
    

}
