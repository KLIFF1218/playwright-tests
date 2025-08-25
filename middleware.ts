import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Страницы входа/регистрации доступны всем
  if (url.pathname.startsWith('/login') || url.pathname.startsWith('/register')) {
    return NextResponse.next();
  }

  // Если нет refresh cookie — редирект на login
  const refresh = req.cookies.get('refresh_token')?.value;
  if (!refresh) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Всё остальное — пропускаем, сервер сам проверит access/roles
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/me/:path*'],
};
