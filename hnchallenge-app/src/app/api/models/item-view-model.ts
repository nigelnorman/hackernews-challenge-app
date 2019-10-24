import { UserViewModel } from './user-view-model';

export interface ItemViewModel {
    id?: number;
    type?: string;
    title?: string;
    by?: UserViewModel
    time?: number;
    text?: string;
    url?: string;
    score?: number;
    dead?: boolean;
    deleted?: boolean;
}