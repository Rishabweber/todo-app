import React, { useState } from 'react'
import { Check, Trash2, Edit2, X, Save } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.title)

  const handleSave = () => {
    if (editValue.trim()) {
      onUpdate(todo.id, { title: editValue.trim() })
      setIsEditing(false)
    }
  }

  const priorityColors = {
    low: 'bg-blue-500/20 text-blue-300',
    medium: 'bg-yellow-500/20 text-yellow-300',
    high: 'bg-red-500/20 text-red-300',
  }

  const createdDate = new Date(todo.createdAt)
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true })

  return (
    <div className="card animate-slideUp group">
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
            todo.completed
              ? 'bg-primary-500 border-primary-500'
              : 'border-dark-600 hover:border-primary-400'
          }`}
        >
          {todo.completed && <Check size={16} className="text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="input-base flex-1 text-sm"
                autoFocus
              />
              <button
                onClick={handleSave}
                className="btn-small text-green-400 hover:text-green-300"
              >
                <Save size={18} />
              </button>
              <button
                onClick={() => {
                  setEditValue(todo.title)
                  setIsEditing(false)
                }}
                className="btn-small text-dark-400 hover:text-dark-200"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <h3
              className={`text-base font-medium transition-all duration-200 ${
                todo.completed
                  ? 'line-through text-dark-500'
                  : 'text-dark-100'
              }`}
            >
              {todo.title}
            </h3>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`badge ${priorityColors[todo.priority]}`}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>

            {todo.dueDate && (
              <span className="badge bg-dark-700 text-dark-300 text-xs">
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}

            <span className="badge bg-dark-700 text-dark-400 text-xs">
              {timeAgo}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="btn-small text-primary-400 hover:text-primary-300"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="btn-small text-red-400 hover:text-red-300"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
