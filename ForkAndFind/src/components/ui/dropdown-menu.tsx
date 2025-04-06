import { cn } from "../../lib/utils"

interface DropdownMenuProps {
  children: React.ReactNode
  className?: string
}

const DropdownMenu = ({ children, className }: DropdownMenuProps) => {
  return (
    <div className={cn("relative inline-block text-left", className)}>
      {children}
    </div>
  )
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const DropdownMenuTrigger = ({ children, className, onClick }: DropdownMenuTriggerProps) => {
  return (
    <div
      className={cn("cursor-pointer", className)}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface DropdownMenuContentProps {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
}

const DropdownMenuContent = ({ children, className, isOpen = false }: DropdownMenuContentProps) => {
  if (!isOpen) return null

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 rounded-md bg-white shadow-lg",
        className
      )}
    >
      <div className="py-1">{children}</div>
    </div>
  )
}

interface DropdownMenuItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const DropdownMenuItem = ({ children, className, onClick }: DropdownMenuItemProps) => {
  return (
    <div
      className={cn(
        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
}