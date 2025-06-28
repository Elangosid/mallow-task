export interface EditData {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface User extends EditData {
  id: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta;
  search: string;
}
