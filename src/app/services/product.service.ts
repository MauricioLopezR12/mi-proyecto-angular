import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  createProduct(product: any): Observable<any> {
    const formData = this.prepareFormData(product);
    return this.http.post<any>(this.apiUrl, formData);
  }

  updateProduct(id: number, productData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}?_method=PUT`, productData);
  }
  

  deleteProduct(id: number): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  private prepareFormData(product: any): FormData {
    const formData = new FormData();
    formData.append('name', product.name.trim());
    formData.append('price', product.price.toString());
    formData.append('quantity', product.quantity.toString());
    if (product.image) {
      formData.append('image', product.image);
    }
    return formData;
  }
}

