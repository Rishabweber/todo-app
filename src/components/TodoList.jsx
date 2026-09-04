import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos, onToggle, onUpdate, onDelete }) {
  return (
    <div className="space-y-3 animate-fadeIn">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
