import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserInitials(name?: string | null, lastname?: string | null): string {
  const firstInitial = name?.charAt(0) || '';
  const lastInitial = lastname?.charAt(0) || '';
  
  return (firstInitial + lastInitial).toUpperCase();
}