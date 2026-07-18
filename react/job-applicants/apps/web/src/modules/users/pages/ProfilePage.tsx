import { useParams } from 'react-router';

export function ProfilePage() {
  const { id } = useParams();
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">User Profile</h1>
      <p className="text-sm text-muted-foreground">Profile details for user ID: {id}</p>
    </section>
  );
}
