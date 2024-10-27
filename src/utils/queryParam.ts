'use client';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export const useSetQueryParam = (): ((
  param: string,
  value: string | number,
) => void) => {
  const router = useRouter();

  const setQueryParam = (param: string, value: string | number): void => {
    const params = new URLSearchParams(window.location.search);

    // Update only the specified parameter
    params.set(param, String(value));

    console.log(`Updating URL with param: ${param}, value: ${value}`);
    console.log(`New URL: ?${params.toString()}`);

    // Replace the current URL with the new one without reloading the page
    router.replace(`?${params.toString()}`);
  };

  return setQueryParam;
};

export const useSetQueryParams = (): ((params: {
  [key: string]: string | number;
}) => void) => {
  const router = useRouter();

  const setQueryParams = (params: { [key: string]: string | number }): void => {
    const searchParams = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });

    console.log('Updating URL with params:', params);
    console.log(`New URL: ?${searchParams.toString()}`);
    router.replace(`?${searchParams.toString()}`);
  };

  return setQueryParams;
};

export const useGetQueryParam = (param: string): string | null => {
  const searchParams = useSearchParams();
  const value = searchParams.get(param); // Use searchParams.get to retrieve the value
  return value || null; // Return the value or null
};
