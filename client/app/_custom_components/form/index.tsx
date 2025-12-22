'use client';

import {
  FieldValues,
  useForm,
  Path,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { field_value_type } from '@/types/form/form.types';
import { BaseFormField } from '@/types/form/form.types';
import { ZodTypeAny } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

/*
 ! BaseFormField<TName, field_value_type>[]
 * TName - a union type for field names in signup form
 * field_value_type - string | File 
 ! TValues extends FieldValues
 * tells useForm that upon succesful validation, form values object will look like this
 ! TName extends Path<TValues>
 * it tells react hook form that the field name will be a valid field in form values object not any random string
*/

type form_props<TValues extends FieldValues, TName extends Path<TValues>> = {
  fields: BaseFormField<TName, field_value_type>[];
  schema: ZodTypeAny;
  submitHandler: SubmitHandler<TValues>;
  loading: boolean;
  btnText?: string;
};

function RenderForm<TValues extends FieldValues, TName extends Path<TValues>>(
  props: form_props<TValues, TName>
) {
  const { fields, schema, submitHandler, loading, btnText = 'Submit' } = props;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TValues>({
    resolver: zodResolver(schema),
  });

  const errorHandler: SubmitErrorHandler<TValues> = (errors) => {
    console.log(getValues());
    console.log(errors);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-7"
    >
      <div className="flex flex-col gap-3">
        {fields.map((field) => {
          const { name, label, type, placeholder, options } = field;

          if (type === 'text' || type === 'email' || type === 'password') {
            return (
              <div key={name} className="flex flex-col gap-2">
                <label className="block">{label}</label>
                <Input
                  type={type}
                  placeholder={placeholder}
                  disabled={loading}
                  {...register(name)}
                  className="border px-3 py-2 w-full"
                />

                {errors[name as keyof typeof errors] && (
                  <p className="text-red-500 text-sm">
                    {String(errors[name as keyof typeof errors]?.message)}
                  </p>
                )}
              </div>
            );
          }

          if (type === 'select') {
            return (
              <div key={name} className="flex flex-col gap-2">
                <label className="block">{label}</label>
                <Select {...register(name)} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                  <option value="">Select {label}</option>
                  {options?.map((option) => (
                    <option key={option.label} value={String(option.value)}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                {errors[name as keyof typeof errors] && (
                  <p className="text-red-500 text-sm">
                    {String(errors[name as keyof typeof errors]?.message)}
                  </p>
                )}
              </div>
            );
          }

          if (type === 'radio') {
            return (
              <div key={name} className="flex flex-col gap-2">
                <label className="block mb-1">{label}</label>
                <RadioGroup
                  {...register(name)}
                  disabled={loading}
                  className="grid grid-cols-1 md:grid-cols-3"
                >
                  {options?.map((option) => (
                    <div key={option.label} className="flex items-center gap-3">
                      <RadioGroupItem
                        value={String(option.value)}
                        id={option.label}
                      />
                      <Label htmlFor={option.label}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors[name as keyof typeof errors] && (
                  <p className="text-red-500 text-sm">
                    {String(errors[name as keyof typeof errors]?.message)}
                  </p>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>
      <Button type="submit" disabled={loading}>
        {btnText}
      </Button>
    </form>
  );
}

export default RenderForm;
