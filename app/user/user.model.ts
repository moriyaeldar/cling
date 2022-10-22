import { Activity } from "../models/Activity";

export interface User {
    id: string
    firstName: string
    lastName: string
    age: number
    email: string
    phoneNumber: string
    location: string
    interests: string[]
    aboutMe: string
    photo?: File
    tokenId?: string
    ownedActivities?: Activity[]
    attendingdActivities?: Activity[]
    pastActivities?: Activity[]
}
