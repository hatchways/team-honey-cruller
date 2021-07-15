export interface Column {
    id: 'Contest Title' | 'Contest Description' | 'Prize Amount' | 'Deadline Date';
    label: string;
    minWidth: number;
    align?: 'right';
    format?: (value: number) => string;
}