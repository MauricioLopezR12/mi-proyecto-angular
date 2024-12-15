import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  paginatedProducts: any[] = [];
  selectedProduct: any = null;
  newProduct: any = { name: '', price: '', quantity: '', image: null };
  selectedImage: File | null = null;

  searchTerm: string = '';
  loggedUser: string = '';
  dropdownOpen: boolean = false;

  showAddModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  showViewModal: boolean = false;

  productsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem('user_email') || 'Usuario';
    this.loadProducts();
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.setupPagination();
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  setupPagination(): void {
    this.totalPages = Math.ceil(this.products.length / this.productsPerPage);
    this.currentPage = 1;
    this.paginateProducts();
  }

  paginateProducts(): void {
    const start = (this.currentPage - 1) * this.productsPerPage;
    const end = start + this.productsPerPage;
    this.paginatedProducts = this.products.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateProducts();
    }
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.paginatedProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
  }

  openAddProductModal(): void {
    this.newProduct = { name: '', price: '', quantity: '', image: null };
    this.selectedImage = null;
    this.showAddModal = true;
  }

  addProduct(): void {
    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('price', this.newProduct.price.toString());
    formData.append('quantity', this.newProduct.quantity.toString());
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.productService.createProduct(formData).subscribe(
      () => {
        alert('Producto agregado correctamente.');
        this.loadProducts();
        this.closeModals();
      },
      (error) => {
        console.error('Error al agregar producto:', error);
        alert('Error al agregar producto. Verifica los datos enviados.');
      }
    );
  }

  editProduct(product: any): void {
    this.selectedProduct = { ...product };
    this.selectedImage = null;
    this.showEditModal = true;
  }

  saveProductEdits(): void {
    const formData = new FormData();
    formData.append('name', this.selectedProduct.name);
    formData.append('price', this.selectedProduct.price.toString());
    formData.append('quantity', this.selectedProduct.quantity.toString());
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.productService.updateProduct(this.selectedProduct.id, formData).subscribe(
      () => {
        alert('Producto actualizado correctamente.');
        this.loadProducts();
        this.closeModals();
      },
      (error) => {
        console.error('Error al actualizar producto:', error);
        alert('Error al actualizar producto. Verifica los datos enviados.');
      }
    );
  }

  deleteProduct(product: any): void {
    this.selectedProduct = product;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    this.productService.deleteProduct(this.selectedProduct.id).subscribe(
      () => {
        alert('Producto eliminado correctamente.');
        this.loadProducts();
        this.closeModals();
      },
      (error) => {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar producto.');
      }
    );
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  closeModals(): void {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.showViewModal = false;
    this.selectedProduct = null;
    this.selectedImage = null;
  }

  viewProduct(product: any): void {
    this.selectedProduct = { ...product };
    this.showViewModal = true;
  }
}
