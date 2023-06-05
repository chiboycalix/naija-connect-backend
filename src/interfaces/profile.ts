export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  geoLocation: {
    lat: number;
    lng: number;
  }
}

export interface IProfile extends Document  {
  profilePicture: string;
  phoneNumber: string;
  username: string;
  interests: string[];
  bio: string;
  address: IAddress;
  userId: string;
}