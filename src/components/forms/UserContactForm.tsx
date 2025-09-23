import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserContact } from '../../types/user';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  fax: z.string().optional(),
  linkedinUrl: z.string().url('Invalid URL').optional(),
});

type UserContactFormValues = z.infer<typeof schema>;

interface Props {
  nextStep?: () => void;
  previousStep?: () => void;
  updateForm?: (data: { userContact: UserContactFormValues }) => void;
  defaultValue?: UserContact;
  onSubmit?: () => void; // Added onSubmit prop
}

const UserContactForm: React.FC<Props> = ({ nextStep, previousStep, updateForm, defaultValue, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValue,
  });

  const handleFormSubmit = (data: UserContactFormValues) => {
    if (updateForm) {
      updateForm({ userContact: data });
    }
    if (nextStep) {
      nextStep();
    } else if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
        <input {...register('email')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">Phone Number</label>
        <input {...register('phoneNumber')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
        {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber.message}</p>}
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">Fax</label>
        <input {...register('fax')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
        {errors.fax && <p className="mt-2 text-sm text-red-600">{errors.fax.message}</p>}
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">LinkedIn URL</label>
        <input {...register('linkedinUrl')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
        {errors.linkedinUrl && <p className="mt-2 text-sm text-red-600">{errors.linkedinUrl.message}</p>}
      </div>
      <div className="flex justify-between mt-8">
        <button type="button" onClick={previousStep} className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-medium rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5">
          Previous
        </button>
        <button type="submit" className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-medium rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5">
          {onSubmit ? 'Update User' : 'Next'}
        </button>
      </div>
    </form>
  );
};

export default UserContactForm;
