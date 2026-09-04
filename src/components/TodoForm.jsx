import React, { useState } from 'react'
import { Plus } from 'lucide-react'

export default function TodoForm({ onAdd }) {
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (input.trim()) {
      onAdd({
        title: input.trim(),
        priority,
        dueDate: dueDate || null,
      })
      
      setInput('')
      setPriority('medium')
      setDueDate('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 card">
      <div className="flex gap-3 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="input-base flex-1"
          autoFocus
        />
        <button type="submit" className="btn-primary flex items-center gap-2 whitespace-nowrap">
          <Plus size={20} />
          Add
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-sm text-dark-400 mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="input-base text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm text-dark-400 mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="input-base text-sm"
          />
        </div>
      </div>
    </form>
  )
}
