export interface ICell {
    isOpen: boolean;
    isMarked: boolean;
    isBomb: boolean;
    bombsAround: number;
}