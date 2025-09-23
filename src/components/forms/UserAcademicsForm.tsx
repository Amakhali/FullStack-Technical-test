import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserAcademics } from '../../types/user';

const schema = z.object({
  academics: z.array(z.object({
    schoolName: z.string().min(1, 'School name is required'),
  })),
});

type UserAcademicsFormValues = z.infer<typeof schema>;

interface Props {
  nextStep?: () => void;
  previousStep?: () => void;
  updateForm?: (data: { userAcademics: UserAcademics[] }) => void;
  defaultValue?: UserAcademics[];
}

const UserAcademicsForm: React.FC<Props> = ({ nextStep, previousStep, updateForm, defaultValue }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<UserAcademicsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { academics: defaultValue && defaultValue.length > 0 ? defaultValue : [{ schoolName: '' }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'academics',
  });

  const onSubmit = (data: UserAcademicsFormValues) => {
    if (updateForm) {
      updateForm({ userAcademics: data.academics });
    }
    if (nextStep) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Academic Record #{index + 1}</h3>
            <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700 font-medium transition duration-200 ease-in-out text-sm">Remove</button>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">School Name</label>
            <input
              {...register(`academics.${index}.schoolName`)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
            {errors.academics?.[index]?.schoolName && (
              <p className="mt-2 text-sm text-red-600">{errors.academics[index]?.schoolName?.message}</p>
            )}
          </div>
        </div>
      ))}
      <button type="button" onClick={() => append({ schoolName: '' })} className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5">
        Add Academic Record
      </button>
      <div className="flex justify-between mt-8">
        <button type="button" onClick={previousStep} className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-medium rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5">
          Previous
        </button>
        <button type="submit" className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-medium rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5">
          Next
        </button>
      </div>
    </form>
  );
};

export default UserAcademicsForm;
