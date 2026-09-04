import React, { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoStats from './components/TodoStats'
import TodoFilter from './components/TodoFilter'
import { useTodoStorage } from './hooks/useTodoStorage'

export default function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo, clearCompleted } = useTodoStorage()
  const [filter, setFilter] = useState('all') // all, active, completed
  const [search, setSearch] = useState('')

  // Filter todos based on filter and search
  const filteredTodos = todos.filter(todo => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed)
    
    const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  // Calculate stats
  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">
            Todo App
          </h1>
          <p className="text-dark-400 text-lg">Stay organized and get things done</p>
        </div>

        {/* Stats */}
        <TodoStats stats={stats} />

        {/* Add Todo Form */}
        <TodoForm onAdd={addTodo} />

        {/* Filter */}
        <TodoFilter filter={filter} setFilter={setFilter} />

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-base"
          />
        </div>

        {/* Todo List */}
        {filteredTodos.length > 0 ? (
          <TodoList 
            todos={filteredTodos} 
            onToggle={toggleTodo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-dark-400 text-lg">
              {todos.length === 0 ? 'No todos yet. Create one to get started!' : 'No matching todos found.'}
            </p>
          </div>
        )}

        {/* Clear Completed Button */}
        {stats.completed > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={clearCompleted}
              className="text-dark-400 hover:text-red-400 transition-colors text-sm font-medium"
            >
              Clear {stats.completed} completed task{stats.completed !== 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
