import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findFirstMissingLetter(name: string): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const lowerCaseName = name.toLowerCase();

  for (const letter of alphabet) {
    if (!lowerCaseName.includes(letter)) {
      return letter.toUpperCase();
    }
  }

  return '-';
}
