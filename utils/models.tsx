import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { ColorSchemeName } from 'react-native';

export interface AuthState {
	isAuthenticating: boolean;
	user: User | null;
}

export interface CountryData {
	cca2: string;
	name: { official: string };
	flags: { png: string };
	idd: { root: string; suffixes: string[] };
}

export interface ThemeOption {
	mode: ColorSchemeName;
	icon: Icon;
	title: string;
	subtitle: string;
}

export interface User {
	id: number;
	fullName: string;
	email: string;
	phoneNumber: string;
	imageUri: string;
}

export type Icon = ComponentProps<typeof MaterialCommunityIcons>['name'];
