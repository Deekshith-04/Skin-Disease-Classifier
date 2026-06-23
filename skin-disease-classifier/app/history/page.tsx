'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem('analysisHistory') || '[]'
    )

    setHistory(data)
  }, [])

  const clearHistory = () => {
    localStorage.removeItem('analysisHistory')
    setHistory([])
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link
            href="/"
            className="text-lg font-bold text-primary"
          >
            Skin Disease Classifier
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-primary hover:underline"
        >
          ← Back to Home
        </Link>

        {/* Page Title */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-5xl font-bold text-foreground">
              Analysis History
            </h1>

            <p className="text-lg text-muted-foreground">
              View all previous skin disease analyses
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Total Analyses: {history.length}
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Clear History
            </button>
          )}
        </div>

        {/* History Section */}
        {history.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <p className="text-muted-foreground">
              No previous analyses found.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {history
              .slice()
              .reverse()
              .map((item, idx) => (
                <div
                    key={idx}
                    onClick={() => {
                        sessionStorage.setItem(
                        'historyResult',
                        JSON.stringify(item.resultData)
                        )

                        router.push('/results')
                    }}
                    className="cursor-pointer rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-lg"
                    >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {item.prediction}
                      </h2>

                      <p className="mt-2 font-medium text-primary">
                        Confidence:{' '}
                        {Number(item.confidence).toFixed(2)}%
                      </p>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.timestamp}
                      </p>
                    </div>

                    <div className="rounded-full bg-primary/10 px-4 py-2 font-medium text-primary">
                      Analysis
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  )
}