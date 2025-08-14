'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

export function ClientFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [name, setName] = useState(searchParams.get('name') || '');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [debouncedName] = useDebounce(name, 500);
  const [debouncedEmail] = useDebounce(email, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedName) params.set('name', debouncedName);
    else params.delete('name');
    if (debouncedEmail) params.set('email', debouncedEmail);
    else params.delete('email');
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedName, debouncedEmail, pathname, router]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
      <div>
        <label htmlFor="name-filter" className="text-sm font-medium text-gray-700">
          Filtrar por nome
        </label>
        <input
          id="name-filter"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Bruce Wayne"
          className="w-full mt-1 px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="email-filter" className="text-sm font-medium text-gray-700">
          Filtrar por e-mail
        </label>
        <input
          id="email-filter"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ex: wayne@email.com"
          className="w-full mt-1 px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  );
}
