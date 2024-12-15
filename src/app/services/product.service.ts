import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/api/products'; // URL del backend

  constructor(private http: HttpClient) {}

  // Obtener productos
  getProducts(): Observable<any[]> {
    const headers = this.createAuthHeaders();
    console.log('Token enviado en la solicitud:', headers.get('Authorization')); // Depuración
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Crear un producto
  createProduct(product: any): Observable<any> {
    const headers = this.createAuthHeaders();
    const formData = this.prepareFormData(product);
    return this.http.post<any>(this.apiUrl, formData, { headers });
  }

  // Actualizar un producto
  updateProduct(id: number, product: any): Observable<any> {
    const headers = this.createAuthHeaders();
    const formData = this.prepareFormData(product);
    return this.http.post<any>(`${this.apiUrl}/${id}?_method=PUT`, formData, { headers });
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  // Crear encabezados de autorización
  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Preparar datos del formulario
  private prepareFormData(product: any): FormData {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    if (product.image) {
      formData.append('image', product.image);
    }
    return formData;
  }
}
