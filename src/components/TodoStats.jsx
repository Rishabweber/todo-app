import React from 'react'
import { CheckCircle2, Circle, ListTodo } from 'lucide-react'

export default function TodoStats({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
      {/* Total */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary-500/20 rounded-lg">
            <ListTodo size={20} className="text-primary-400" />
          </div>
          <div>
            <p className="text-dark-400 text-xs sm:text-sm">Total Tasks</p>
            <p className="text-2xl font-bold text-dark-100">{stats.total}</p>
          </div>
        </div>
      </div>

      {/* Active */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-yellow-500/20 rounded-lg">
            <Circle size={20} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-dark-400 text-xs sm:text-sm">Active</p>
            <p className="text-2xl font-bold text-dark-100">{stats.active}</p>
          </div>
        </div>
      </div>

      {/* Completed */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-green-500/20 rounded-lg">
            <CheckCircle2 size={20} className="text-green-400" />
          </div>
          <div>
            <p className="text-dark-400 text-xs sm:text-sm">Completed</p>
            <p className="text-2xl font-bold text-dark-100">{stats.completed}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
