"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface BackButtonProps {
  href: string
  className?: string
}

export function BackButton({ href, className }: BackButtonProps) {
  return (
    <Button variant="ghost" size="icon" asChild className={className}>
      <Link href={href}>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Volver</span>
      </Link>
    </Button>
  )
}

export { BackButton as default }
