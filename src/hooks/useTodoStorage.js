import { useState, useEffect } from 'react'

const STORAGE_KEY = 'todos'

export function useTodoStorage() {
  const [todos, setTodos] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY)
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos))
      } catch (error) {
        console.error('Failed to parse todos from localStorage:', error)
        setTodos([])
      }
    }
    setIsLoaded(true)
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
  }, [todos, isLoaded])

  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now().toString(),
      title: todoData.title,
      priority: todoData.priority || 'medium',
      dueDate: todoData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTodos([newTodo, ...todos])
    return newTodo
  }

  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            ...updates,
            updatedAt: new Date().toISOString(),
          }
        : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
            updatedAt: new Date().toISOString(),
          }
        : todo
    ))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
  }
}
