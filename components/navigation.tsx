"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Shield, Eye, FileText, CheckCircle, Database } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Models",
    href: "/models",
    icon: Database,
  },
  {
    title: "Bias Detection",
    href: "/bias",
    icon: Shield,
  },
  {
    title: "Explainability",
    href: "/explainability",
    icon: Eye,
  },
  {
    title: "Model Cards",
    href: "/model-cards",
    icon: FileText,
  },
  {
    title: "Compliance",
    href: "/compliance",
    icon: CheckCircle,
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <h1 className="text-xl font-semibold text-foreground">Responsible AI</h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="border-t border-border p-4">
        <p className="text-xs text-muted-foreground">v1.0.0 | NIST AI RMF Compliant</p>
      </div>
    </nav>
  )
}
