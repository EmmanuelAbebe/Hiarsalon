// app/(dashboard)/not-found.tsx
export default function DashboardNotFound() {
  return (
    <div className="flex h-full flex-col items-start justify-center">
      <h1 className="mb-4 text-3xl font-bold text-heading">404</h1>
      <p className="mb-2 text-lg">This dashboard page could not be found.</p>
      <p className="text-sm text-gray-600">
        Check the URL or use the sidebar to navigate.
      </p>
    </div>
  );
}
