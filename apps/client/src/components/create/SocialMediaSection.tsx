import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
import { X } from 'lucide-react'
import { Platform, SocialMediaAccountBase } from '@influencer-management/shared/src'
import { cn } from '@/lib/utils.ts'
import { MAX_NAME_LENGTH } from '@influencer-management/shared/'

type SocialMediaAccountUpdate = { field: 'platform'; value: Platform } | { field: 'username'; value: string }

interface SocialMediaSectionProps {
  accounts: SocialMediaAccountBase[]
  newAccount: SocialMediaAccountBase
  onAddAccount: () => void
  onRemoveAccount: (index: number) => void
  onNewAccountChange: (update: SocialMediaAccountUpdate) => void
}

export function SocialMediaSection({ accounts, newAccount, onAddAccount, onRemoveAccount, onNewAccountChange }: SocialMediaSectionProps) {
  return (
    <div className="space-y-4">
      <Label>Social Media Accounts</Label>

      <div className="grid grid-cols-[140px_1fr_auto] gap-2">
        <Select
          value={newAccount.platform}
          onValueChange={(value: Platform) => onNewAccountChange({ field: 'platform', value })}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INSTAGRAM">Instagram</SelectItem>
            <SelectItem value="TIKTOK">TikTok</SelectItem>
          </SelectContent>
        </Select>

        <Input
          value={newAccount.username}
          onChange={e => onNewAccountChange({ field: 'username', value: e.target.value })}
          placeholder="Username"
          className="flex-1"
          maxLength={50}
        />

        <Button
          type="button"
          onClick={onAddAccount}
        >
          Add Account
        </Button>

        <div
          className={cn('text-xs text-muted-foreground col-start-2', newAccount.username.length >= MAX_NAME_LENGTH && 'text-destructive')}
        >
          {newAccount.username.length}/{MAX_NAME_LENGTH} characters
        </div>
      </div>

      <div className="space-y-2">
        {accounts.map((account, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-100 p-2 rounded"
          >
            <span className="font-medium">{account.platform}:</span>
            <span className="flex-1">{account.username}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemoveAccount(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
