import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  // Определите ваше условие для редиректа
  const allowedDomain = process.env.NEXT_PUBLIC_FRONT_URL;
  const host = request.headers.get('host');

  // Если домен не совпадает с разрешенным, редиректим на изображение
  if (allowedDomain && host && !host.includes(allowedDomain)) {
    const blockedImageUrl =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI7bwpA8ERtYx1XLR96TAn4j0Gjf1dQEHCkw&s';
    return NextResponse.redirect(blockedImageUrl); // Перенаправляем на изображение
  }

  // Если условие не выполнено, продолжаем запрос
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // Это условие применится ко всем маршрутам
};
