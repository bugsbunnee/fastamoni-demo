export interface User {
	id: string;
	firstName: string;
}

export interface CountryData {
	cca2: string;
	name: { official: string };
	flags: { png: string };
	idd: { root: string; suffixes: string[] };
}
