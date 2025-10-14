"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ModelCardPreview } from "@/components/model-card-preview"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockModels, mockModelCards } from "@/lib/mock-data"
import { Plus, Search, FileText } from "lucide-react"
import Link from "next/link"

export default function ModelCardsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCards = mockModelCards.filter((card) => {
    const model = mockModels.find((m) => m.id === card.model_id)
    return (
      model?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.purpose.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Model Cards</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive documentation for transparency and accountability
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate Card
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search model cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Info Card */}
          <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1">About Model Cards</h3>
                <p className="text-sm text-muted-foreground">
                  Model cards provide structured documentation about ML models, including their purpose, performance,
                  limitations, and ethical considerations. They promote transparency and help stakeholders make informed
                  decisions about model deployment and use.
                </p>
              </div>
            </div>
          </div>

          {/* Model Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card) => {
              const model = mockModels.find((m) => m.id === card.model_id)
              return (
                <Link key={card.id} href={`/model-cards/${card.id}`}>
                  <ModelCardPreview modelCard={card} modelName={model?.name || "Unknown Model"} />
                </Link>
              )
            })}
          </div>

          {filteredCards.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No model cards found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
