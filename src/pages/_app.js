import "@/styles/globals.css"
import Link from "next/link"

export default function App({ Component, pageProps }) {
  return (
    <main className="flex flex-col">
      <header className="bg-blue-200 text-blue-800 border-b border-blue-400 p-4 rounded-lg mb-4">
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:underline">
            PLACES
          </Link>
          <div className="flex justify-center space-x-6">
            <Link href="/search/filters" className="text-base hover:underline">
              Filter
            </Link>
            <Link href="/addApplication" className="text-base hover:underline">
              ADD
            </Link>
          </div>
        </div>
      </header>
      <section className="max-w-xl mx-auto p-4">
        <Component {...pageProps} />
      </section>
    </main>
  )
}