export type FieldDescriptor<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T]) => React.ReactNode;
};
