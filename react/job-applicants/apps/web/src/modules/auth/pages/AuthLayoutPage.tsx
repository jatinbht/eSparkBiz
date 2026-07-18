import { Outlet } from 'react-router';

export function AuthLayoutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
