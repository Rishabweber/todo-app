import React from 'react'

export default function TodoFilter({ filter, setFilter }) {
  const filters = [
    { value: 'all', label: 'All Tasks' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ]

  return (
    <div className="flex gap-2 mb-6 bg-dark-800 rounded-lg p-1 border border-dark-700">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            filter === f.value
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/50'
              : 'text-dark-400 hover:text-dark-200'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
