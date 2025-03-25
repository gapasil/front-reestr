// /src/app/api/sitemap/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';
import { API } from '@/variable/Api';
import { ExtendedCrud } from '@/types/Crud';

export async function GET(): Promise<NextResponse> {
  const baseUrl = 'https://reestr-rusofobov.ru'; // Ваш базовый URL

  // Список статических страниц
  const pages: string[] = [
    '/',
    '/about',
    '/reestr',
    // Добавьте больше статических страниц, если необходимо
  ];

  // Сначала предполагаем, что нам нужно запрашивать страницы с пагинацией
  let allCruds: ExtendedCrud[] = [];
  let currentPage = 1;
  let totalPages = 1; // Это предполагаемое количество страниц, начинаем с 1

  // Запрос всех страниц данных с пагинацией
  try {
    while (currentPage <= totalPages) {
      // Делаем запрос для получения данных для текущей страницы
      const response = await axios.get(
        `${API}api/cruds?page=${currentPage}&limit=50`,
      ); // limit=50 для получения 50 записей за раз, можете увеличить или уменьшить

      // Добавляем записи на текущей странице в общий массив
      allCruds = allCruds.concat(response.data.items); // Все записи добавляем в массив

      // Получаем информацию о количестве страниц (например, из поля totalPages или nextPage)
      totalPages = response.data.totalPages || 1; // Если в ответе нет totalPages, используем 1 страницу по умолчанию

      // Переходим к следующей странице
      currentPage++;
    }

    // Теперь allCruds содержит все записи, мы можем генерировать для них sitemap
    allCruds.forEach((crud: { id: string }) => {
      pages.push(`/mraz/${crud.id}`);
    });
  } catch (error) {
    console.error('Ошибка при получении данных для cruds:', error);
  }

  // Генерация XML содержимого для sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map((page) => {
        return `
          <url>
            <loc>${baseUrl}${page}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
          </url>
        `;
      })
      .join('')}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
