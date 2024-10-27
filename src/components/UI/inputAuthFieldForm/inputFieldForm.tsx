import { Control, Controller, FieldErrors } from 'react-hook-form';
import styles from './style.module.scss';
import { z } from 'zod';
import { schemaLogin } from '@/types/auth/schemaAuth';

type FormData = z.infer<typeof schemaLogin>;

interface InputFieldProps {
  label: string;
  name: keyof FormData;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  type?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  control,
  errors,
  type = 'text',
}) => (
  <div className={styles.blockInput}>
    <label>{label}:</label>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => <input type={type} {...field} />}
    />
    {errors[name] && (
      <span className={styles.error}>
        {(errors[name] as { message?: string })?.message}
      </span>
    )}
  </div>
);
