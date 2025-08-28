// src/components/LogsBox.tsx
import { useEffect, useState } from 'react'

export default function LogsBox() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetch('/api/logs')
      .then(res => res.json())
      .then(setLogs)
  }, [])

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">📜 Recent Requests</h2>
      <ul className="text-sm space-y-1">
        {logs.map((log, i) => (
          <li key={i}>
            <span className="font-mono">{log.url}</span> —{' '}
            <span className="text-gray-500">{new Date(log.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
