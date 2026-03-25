
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6 space-y-4">
      
     
      <h1 className="h1 text-primary">Dashboard</h1>

      <h2 className="h2">Overview</h2>

      <p className="p">
        This is your main dashboard where you can track analytics and manage your store.
      </p>

      <p className="subpara">
        Last updated 2 mins ago
      </p>

      <div className="card">
        <h3 className="h3">Revenue</h3>
        <p className="subheading">This month</p>
        <p className="p mt-2">₹45,000</p>
      </div>

      <div className="flex gap-3">
        <button className="btn-primary">Save</button>
        <button className="btn-secondary">Cancel</button>
      </div>

    </main>
  );
}