export interface List<T> {
  items: T[];

  add(item: T): void;
}
