export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8">
            <h1 className="text-3xl font-bold mb-6 text-red-500">ADMIN CONTROL PLANE</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
                    <h2 className="text-xl font-semibold mb-2">User Management</h2>
                    <p className="text-neutral-400">Manage client access and roles.</p>
                </div>
                <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
                    <h2 className="text-xl font-semibold mb-2">System Logs</h2>
                    <p className="text-neutral-400">View recent activity and errors.</p>
                </div>
                <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
                    <h2 className="text-xl font-semibold mb-2">Content CMS</h2>
                    <p className="text-neutral-400">Update blog posts and announcements.</p>
                </div>
            </div>
        </div>
    );
}
