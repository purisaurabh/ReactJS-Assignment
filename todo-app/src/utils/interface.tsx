export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export enum Order {
  asc = "Ascending",
  desc = "Descending",
}

export enum Filter {
  complete = "Completed",
  incomplete = "InCompleted",
}
