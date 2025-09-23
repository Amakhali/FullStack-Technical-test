import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserInfo } from '../../types/user';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  occupation: z.string().min(1, 'Occupation is required'),
  gender: z.string().min(1, 'Gender is required'),
  profilePhoto: z.any()
    .refine((file) => file instanceof File || typeof file === 'string' || file === null, 'Profile photo must be a file, a URL, or empty')
    .optional(),
});

type UserInfoFormValues = z.infer<typeof schema>;

interface Props {
  nextStep?: () => void;
  previousStep?: () => void; // Added for consistency with StepWizard
  updateForm?: (data: { userInfo: UserInfoFormValues }) => void;
  defaultValue?: UserInfo;
}

const UserInfoForm: React.FC<Props> = ({ nextStep, previousStep, updateForm, defaultValue }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserInfoFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValue,
  });



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 200; // Max width/height for the resized image
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, { type: file.type });
              setValue('profilePhoto', resizedFile);
            }
          }, file.type);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      setValue('profilePhoto', null);
    }
  };

  const onSubmit = (data: UserInfoFormValues) => {
    if (updateForm) {
      updateForm({ userInfo: data });
    }
    if (nextStep) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">First Name</label>
          <input {...register('firstName')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Last Name</label>
          <input {...register('lastName')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Date of Birth</label>
          <input type="date" {...register('dob')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          {errors.dob && <p className="mt-2 text-sm text-red-600">{errors.dob.message}</p>}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Occupation</label>
          <input {...register('occupation')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          {errors.occupation && <p className="mt-2 text-sm text-red-600">{errors.occupation.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">Gender</label>
        <input {...register('gender')} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
        {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender.message}</p>}
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">Profile Photo</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
        {errors.profilePhoto?.message && typeof errors.profilePhoto.message === 'string' && (
          <p className="mt-2 text-sm text-red-600">{errors.profilePhoto.message}</p>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button type="button" onClick={previousStep} className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-medium rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5">
          Previous
        </button>
        <button type="submit" className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-xlg font-medium rounded-full text-black bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5">
          Next
        </button>
      </div>
    </form>
  );
};

export default UserInfoForm;
