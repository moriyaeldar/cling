export interface Activity {
  _id: string;
  title: string;
  description: string;
  creator: string;
  date: string;
  timeFrame: string;
  groupSize: number;
  interests: string[];
  participants: string[];
  location: string;
  photo: string;
  price: number;
  age: number;
  repeated: boolean;
  IsConfirmationRequired: boolean;
  status: boolean;
}
