import { UserModel } from '../user.model';
export interface UserState{
    users:UserModel[];
}
export const initialState : UserState={
    users : null!,
};