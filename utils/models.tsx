import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

export interface AuthState {
	isAuthenticating: boolean;
	user: User | null;
}

export interface User {
	id: number;
	fullName: string;
	email: string;
	phoneNumber: string;
	imageUri: string;
}

export interface CountryData {
	cca2: string;
	name: { official: string };
	flags: { png: string };
	idd: { root: string; suffixes: string[] };
}

export type Icon = ComponentProps<typeof MaterialCommunityIcons>['name'];
