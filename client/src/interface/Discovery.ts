export interface Column {
    id: 'Contest Title' | 'Contest Description' | 'Prize Amount' | 'Deadline Date' | 'More Info';
    label: string;
    minWidth?: number;
    align?: 'right';
}