import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8080";  // Corrected to a string

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postCar(carDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/admin/car`, carDto, {
      headers: this.createAuthorizationHeader(),
      responseType: 'text'
    });
  }

  getAllCars(): Observable<any>{
    return this.http.get(`${BASIC_URL}/api/admin/cars`, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${BASIC_URL}/api/admin/car/${id}`,{
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(id:number) : Observable<any> {
    return this.http.get(`${BASIC_URL}/api/admin/car/${id}`,{
      headers: this.createAuthorizationHeader()
    });
  }

  /*updateCar(carId:number, carDto:FormData): Observable<any> {
    return this.http.put(`${BASIC_URL}/api/admin/car/${carId}`, carDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    const authToken = StorageService.getToken();
    let authHeaders = new HttpHeaders();
    return authHeaders.set('Authorization', `Bearer ${authToken}`);
  }*/


    updateCar(carId: number, carDto: FormData): Observable<any> {
      return this.http.put(`${BASIC_URL}/api/admin/car/${carId}`, carDto, {
        headers: this.createAuthorizationHeader()
        // Note: No need to add 'Content-Type' manually for FormData
      });
  }


  getCarBookings(): Observable<any>{
    return this.http.get(`${BASIC_URL}/api/admin/car/bookings`, {
      headers: this.createAuthorizationHeader()
    });
  }

  changeBookingStatus(bookingId:number,status:string): Observable<any>{
    return this.http.get(`${BASIC_URL}/api/admin/car/booking/${bookingId}/${status}`, {
      headers: this.createAuthorizationHeader()
    });
  }


  searchCar(searchCarDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/admin/car/search`, searchCarDto, {
      headers: this.createAuthorizationHeader()
    });
  }



  
  createAuthorizationHeader(): HttpHeaders {
      const authToken = StorageService.getToken();
      let authHeaders = new HttpHeaders();
      authHeaders = authHeaders.set('Authorization', `Bearer ${authToken}`);
      return authHeaders;
  }
  
}
