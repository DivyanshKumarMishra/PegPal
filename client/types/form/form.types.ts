export type field_type =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'range'
  | 'file';

export type field_value_type = string | File;

export type field_option<TValue = string> = {
  label: string;
  value: TValue;
};

export type BaseFormField<TName extends string = string, TValue = unknown> = {
  name: TName;
  label: string;
  type: field_type;
  placeholder?: string;
  options?: field_option<TValue>[];
  default?: any;
};

/*
 ! BaseFormField<TName, TValue>
 * TName - generic type for field name
 * TValue - generic type for field value
*/ 