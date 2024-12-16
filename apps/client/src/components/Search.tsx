import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { MAX_NAME_LENGTH } from '@influencer-management/shared'
import { InfluencerSearchProps } from '@/types/influencerSearch.tsx'
import { cn } from '@/lib/utils.ts'

export function InfluencerSearch({ filters, onSearchChange }: InfluencerSearchProps) {
  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="name">Search by Name</Label>
          <Input
            className="bg-white transition-colors hover:border-primary/50 focus:border-primary"
            id="name"
            maxLength={MAX_NAME_LENGTH}
            name="name"
            onChange={onSearchChange}
            placeholder="Enter influencer name..."
            type="text"
            value={filters.name}
          />
          <div
            id="name-limit"
            className={cn('text-xs text-muted-foreground', filters.name.length >= MAX_NAME_LENGTH && 'text-destructive')}
          >
            {filters.name.length}/{MAX_NAME_LENGTH} characters
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor="manager">Search by Manager</Label>
          <Input
            className="bg-white transition-colors hover:border-primary/50 focus:border-primary"
            id="manager"
            maxLength={MAX_NAME_LENGTH}
            name="manager"
            onChange={onSearchChange}
            placeholder="Enter manager name..."
            type="text"
            value={filters.manager}
          />
          <div
            id="name-limit"
            className={cn('text-xs text-muted-foreground', filters.manager.length >= MAX_NAME_LENGTH && 'text-destructive')}
          >
            {filters.manager.length}/{MAX_NAME_LENGTH} characters
          </div>
        </div>
      </div>
    </div>
  )
}
