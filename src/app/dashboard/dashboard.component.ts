import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  paginatedProducts: any[] = [];
  loggedUser: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  pages: number[] = [];
  selectedProduct: any = null;
  newProduct: any = { name: '', price: '', quantity: '', image: null };

  searchTerm: string = '';
  dropdownOpen: boolean = false;
  showViewModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  showAddModal: boolean = false;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loggedUser = localStorage.getItem('user_email') || 'Usuario';
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        console.log('Productos cargados:', this.products); 
        this.filteredProducts = [...this.products];
        this.setupPagination();
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }
  

  filterProducts(): void {
    const term = this.searchTerm ? this.searchTerm.toLowerCase() : '';
    this.filteredProducts = this.products.filter((product) => {
      
      return product.name && product.name.toLowerCase().includes(term);
    });
    this.setupPagination();
  }
  

  setupPagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  viewProduct(product: any): void {
    this.selectedProduct = { ...product };
    this.showViewModal = true;
  }

  openAddProductModal(): void {
    this.newProduct = { name: '', price: '', quantity: '', image: null };
    this.showAddModal = true;
  }

  addProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe(
      (response) => {
        
        this.products.push(response.data);
        this.filterProducts(); 
        this.paginate();
        this.closeModals();
        alert('Producto agregado correctamente.');
      },
      (error) => {
        console.error('Error al agregar producto:', error);
        alert('Error al agregar producto. Verifica los datos enviados.');
      }
    );
  }
  

  onImageSelected(event: any, isAdding: boolean = false): void {
    const file = event.target.files[0];
    if (file) {
      if (isAdding) {
        this.newProduct.image = file;
      } else {
        this.selectedProduct.image = file;
      }
    }
  }
  
  

  editProduct(product: any): void {
    this.selectedProduct = { ...product };
    this.showEditModal = true;
  }

  saveProductEdits(): void {
    if (this.selectedProduct) {
      const updatedProduct = new FormData();
      updatedProduct.append('name', this.selectedProduct.name.trim());
      updatedProduct.append('price', this.selectedProduct.price.toString());
      updatedProduct.append('quantity', this.selectedProduct.quantity.toString());
  
      if (this.selectedProduct.image instanceof File) {
        updatedProduct.append('image', this.selectedProduct.image);
      }
  
      this.productService.updateProduct(this.selectedProduct.id, updatedProduct).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
  
        
          this.products = this.products.map((p) =>
            p.id === response.data.id ? { ...response.data } : p
          );
  
          this.filteredProducts = [...this.products];
          this.paginate();
          this.closeModals();
  
          alert('Producto actualizado correctamente.');
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
          alert('Error al actualizar el producto.');
        }
      );
    }
  }
  
  
  
  

  deleteProduct(productId: number): void {
    this.selectedProduct = this.products.find((p) => p.id === productId);
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.selectedProduct) {
      this.productService.deleteProduct(this.selectedProduct.id).subscribe(
        () => {
          this.products = this.products.filter((p) => p.id !== this.selectedProduct.id);
          this.filterProducts();
          this.paginate();
          this.closeModals();
          alert('Producto eliminado correctamente.');
        },
        (error) => {
          console.error('Error al eliminar producto:', error);
        }
      );
    }
  }

  closeModals(): void {
    this.showViewModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.showAddModal = false;
    this.selectedProduct = null;
  }
}
