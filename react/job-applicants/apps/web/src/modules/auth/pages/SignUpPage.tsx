export function SignUpPage() {
  return (
    <section className="space-y-6 rounded-xl border border-border bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-semibold">Sign Up</h1>
      <form className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-muted-foreground">Full name</span>
          <input name="name" type="text" className="mt-1 block w-full rounded-md border px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted-foreground">Email</span>
          <input name="email" type="email" className="mt-1 block w-full rounded-md border px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted-foreground">Password</span>
          <input name="password" type="password" className="mt-1 block w-full rounded-md border px-3 py-2" />
        </label>
        <button type="submit" className="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-white">
          Create account
        </button>
      </form>
    </section>
  );
}
