'use client'

import type { ReactNode } from 'react'
import { Link } from '@/lib/navigation'
import { Button } from './Button'

interface EmptyStateProps {
  title: string
  description: string
  action?: { label: string; href: string }
  children?: ReactNode
}

export function EmptyState({
  title,
  description,
  action,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <h2 className="text-xl font-semibold text-text mb-2">{title}</h2>
      <p className="text-text-secondary max-w-md mb-6">{description}</p>
      {action && (
        <Link to={action.href}>
          <Button variant="primary">{action.label}</Button>
        </Link>
      )}
      {children}
    </div>
  )
}
