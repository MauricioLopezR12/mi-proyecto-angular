import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  users: any[] = [];
  paginatedUsers: any[] = [];
  selectedUser: any = null;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  showAddModal: boolean = false;
  showViewModal: boolean = false;
  searchTerm: string = '';
  newUser: any = { name: '', email: '', password: '', image: null };
  selectedImage: File | null = null; // Para manejar la imagen seleccionada

  loggedUser: string = '';
  loggedUserImage: string | null = null;
  dropdownOpen: boolean = false;

  usersPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Recuperar el email del usuario logueado desde localStorage
    this.loggedUser = localStorage.getItem('user_email') || 'Usuario';
  
    // Recuperar la imagen del usuario logueado desde localStorage
    this.loggedUserImage = localStorage.getItem('user_image') || '';
  
    // Depuración para verificar si los datos se cargaron correctamente
    console.log('Logged User Email:', this.loggedUser);
    console.log('Logged User Image URL:', this.loggedUserImage);
  
    // Si la imagen no está presente, emitir un aviso
    if (!this.loggedUserImage) {
      console.warn('No se encontró una imagen para el usuario logueado.');
    }
  
    // Cargar la lista de usuarios
    this.loadUsers();
  }
  

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  goToProducts(): void {
    this.router.navigate(['/dashboard']);
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.setupPagination();
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  setupPagination(): void {
    this.totalPages = Math.ceil(this.users.length / this.usersPerPage);
    this.currentPage = 1;
    this.paginateUsers();
  }

  paginateUsers(): void {
    const start = (this.currentPage - 1) * this.usersPerPage;
    const end = start + this.usersPerPage;
    this.paginatedUsers = this.users.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginateUsers();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateUsers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateUsers();
    }
  }

  filterUsers(): void {
    const term = this.searchTerm.toLowerCase();
    const filtered = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    this.totalPages = Math.ceil(filtered.length / this.usersPerPage);
    this.currentPage = 1;
    this.paginatedUsers = filtered.slice(0, this.usersPerPage);
  }

  onImageSelected(event: any, isEditing: boolean = false): void {
    const file = event.target.files[0];
    if (file) {
      if (isEditing) {
        this.selectedImage = file; // Imagen para edición
      } else {
        this.newUser.image = file; // Imagen para agregar
      }
    }
  }

  openAddUserModal(): void {
    this.newUser = { name: '', email: '', password: '', image: null };
    this.selectedImage = null;
    this.showAddModal = true;
  }

  addUser(): void {
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.newUser.name);
    formData.append('email', this.newUser.email);
    formData.append('password', this.newUser.password);
    if (this.newUser.image) {
      formData.append('image', this.newUser.image);
    }

    this.userService.addUser(formData).subscribe(
      (response) => {
        alert('Usuario agregado correctamente');
        this.closeModals();
        this.newUser = { name: '', email: '', password: '', image: null };
        this.loadUsers();
      },
      (error) => {
        console.error('Error al agregar usuario:', error);
        alert('Ocurrió un error al agregar el usuario');
      }
    );
  }

  editUser(user: any): void {
    this.selectedUser = { ...user };
    this.selectedImage = null; // Resetear la imagen seleccionada para edición
    this.showEditModal = true;
  }

  saveUser(): void {
    if (this.selectedUser) {
      const formData = new FormData();
      formData.append('name', this.selectedUser.name);
      formData.append('email', this.selectedUser.email);
      if (this.selectedUser.password) {
        formData.append('password', this.selectedUser.password);
      }
      if (this.selectedImage) {
        formData.append('image', this.selectedImage); // Solo adjuntar imagen si se selecciona
      }

      this.userService.updateUser(this.selectedUser.id, formData).subscribe(
        () => {
          this.loadUsers();
          this.closeModals();
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    }
  }

  deleteUser(user: any): void {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.selectedUser) {
      this.userService.deleteUser(this.selectedUser.id).subscribe(
        () => {
          this.loadUsers();
          this.closeModals();
        },
        (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      );
    }
  }

  viewUser(user: any): void {
    this.selectedUser = { ...user };
    this.showViewModal = true;
  }

  closeModals(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.showAddModal = false;
    this.showViewModal = false;
    this.selectedUser = null;
    this.selectedImage = null; 
  }
}
