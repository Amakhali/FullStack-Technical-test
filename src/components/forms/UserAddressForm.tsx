import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserAddress } from '../../types/user';

const schema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
});

type UserAddressFormValues = z.infer<typeof schema>;

interface Props {
  nextStep?: () => void;
  previousStep?: () => void;
  updateForm?: (data: { userAddress: UserAddressFormValues }) => void;
  defaultValue?: UserAddress;
}

const UserAddressForm: React.FC<Props> = ({ nextStep, previousStep, updateForm, defaultValue }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserAddressFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValue,
  });

  const onSubmit = (data: UserAddressFormValues) => {
    if (updateForm) {
      updateForm({ userAddress: data });
    }
    if (nextStep) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">Address</label>
        <input {...register('address')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
        {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>}
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">City</label>
        <input {...register('city')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
        {errors.city && <p className="mt-2 text-sm text-red-600">{errors.city.message}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">State</label>
          <input {...register('state')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          {errors.state && <p className="mt-2 text-sm text-red-600">{errors.state.message}</p>}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Country</label>
          <input {...register('country')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          {errors.country && <p className="mt-2 text-sm text-red-600">{errors.country.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">Zip Code</label>
        <input {...register('zipCode')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
        {errors.zipCode && <p className="mt-2 text-sm text-red-600">{errors.zipCode.message}</p>}
      </div>
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

export default UserAddressForm;