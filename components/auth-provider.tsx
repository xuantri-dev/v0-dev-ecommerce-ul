"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  memberSince: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  isLoading: boolean
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data
const MOCK_USER: User = {
  id: "1",
  firstName: "Alexander",
  lastName: "Sterling",
  email: "alexander.sterling@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Madison Avenue, New York, NY 10016",
  memberSince: "January 2024",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock login - accept any credentials
    const loggedInUser = { ...MOCK_USER, email }
    setUser(loggedInUser)
    localStorage.setItem("mockUser", JSON.stringify(loggedInUser))
  }

  const register = async (data: RegisterData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock registration
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      memberSince: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    }
    setUser(newUser)
    localStorage.setItem("mockUser", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("mockUser")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
