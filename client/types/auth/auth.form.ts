import { BaseFormField, field_value_type } from '@/types/form/form.types';

export type signup_names =
  | 'full_name'
  | 'email'
  | 'password'
  | 'confirm_password'
  | 'gender';

const signup_fields: BaseFormField<signup_names, field_value_type>[] = [
  {
    name: 'full_name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter you name',
    default: '',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'abc@example.com',
    default: '',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '',
    default: '',
  },
  {
    name: 'confirm_password',
    label: 'Confirm Password',
    type: 'password',
    placeholder: '',
    default: '',
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'radio',
    options: [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Others', value: 'Others' },
    ],
  }
];

export type login_names = Extract<signup_names, 'email' | 'password'>;

const login_fields: BaseFormField<login_names, string>[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'abc@example.com',
    default: '',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '',
    default: '',
  },
];

export { signup_fields, login_fields };
