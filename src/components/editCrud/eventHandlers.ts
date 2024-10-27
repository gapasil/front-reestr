import { Crud } from '@/types/Crud';
import { Categories } from '@/types/enumCategory';
import { Dispatch, SetStateAction } from 'react';

// Function to handle field changes
export const handleChange = (
  setData: Dispatch<SetStateAction<Crud>>,
): ((
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
  field: keyof Crud,
) => void) => {
  return (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof Crud,
  ): void => {
    const value = e.target.value;
    setData((prevData: Crud) => ({
      ...prevData,
      [field]: value,
    }));
  };
};

// Function to handle category changes
export const handleCategoryChange = (
  setData: Dispatch<SetStateAction<Crud>>,
): ((e: React.ChangeEvent<HTMLSelectElement>, index: number) => void) => {
  return (e: React.ChangeEvent<HTMLSelectElement>, index: number): void => {
    const value = e.target.value as Categories;
    setData((prevData: Crud) => {
      const newCategories = [...prevData.categories];
      newCategories[index] = value;
      return { ...prevData, categories: newCategories };
    });
  };
};

// Function to add a new category
export const handleAddCategory = (
  setData: Dispatch<SetStateAction<Crud>>,
): (() => void) => {
  return (): void => {
    setData((prevData: Crud) => ({
      ...prevData,
      categories: [...prevData.categories, undefined],
    }));
  };
};

// Function to remove a category
export const handleRemoveCategory = (
  setData: Dispatch<SetStateAction<Crud>>,
): ((index: number) => void) => {
  return (index: number): void => {
    setData((prevData: Crud) => ({
      ...prevData,
      categories: prevData.categories.filter((_, i) => i !== index),
    }));
  };
};

// Function to add a new proof
export const handleAddProof = (
  setData: Dispatch<SetStateAction<Crud>>,
): (() => void) => {
  return (): void => {
    setData((prevData: Crud) => ({
      ...prevData,
      proof: [...(prevData.proof || []), { description: '', link: '' }],
    }));
  };
};

// Function to remove a proof
export const handleRemoveProof = (
  setData: Dispatch<SetStateAction<Crud>>,
): ((index: number) => void) => {
  return (index: number): void => {
    setData((prevData: Crud) => ({
      ...prevData,
      proof: prevData.proof?.filter((_, i) => i !== index),
    }));
  };
};
