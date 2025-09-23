export interface UserInfo {
  profilePhoto?: string | File | null;
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: string;
}

export interface UserContact {
  email: string;
  phoneNumber: string;
  fax?: string;
  linkedinUrl?: string;
}

export interface UserAddress {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface UserAcademics {
  schoolName: string;
}

export interface User {
  id: number;
  userInfo: UserInfo;
  userContact: UserContact;
  userAddress: UserAddress;
  userAcademics: UserAcademics[];
}
