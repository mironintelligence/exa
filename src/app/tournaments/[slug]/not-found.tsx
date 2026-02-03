export default function NotFound() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <h2 className="text-2xl mb-4">Tournament Not Found</h2>
                <p className="text-zinc-400 mb-8">
                    This tournament doesn't exist or is not currently active.
                </p>
                <a
                    href="/"
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
                >
                    Return Home
                </a>
            </div>
        </div>
    );
}
