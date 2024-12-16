import { InfluencerWithManager, ManagerBase } from '@/types/influencerSearch.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Modal } from '@/components/Modal.tsx'
import { useManagers } from '@/hooks/useManager.ts'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx'
import { Button } from '@/components/ui/button.tsx'
import { SocialMediaBadge } from '@/components/SocialMediaBage.tsx'
import { memo } from 'react'

interface InfluencerCardProps {
  influencers: InfluencerWithManager[] | undefined
}

export const InfluencerCard = ({ influencers }: InfluencerCardProps) => {
  if (!influencers) return null

  const { data: managers, isLoading: isLoadingManagers, error } = useManagers()

  if (isLoadingManagers) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-muted-foreground">
        <div className="space-y-2 text-center">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          <p>Loading influencer cards</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert
        variant="destructive"
        className="max-w-md mx-auto my-4"
      >
        <AlertTitle>Failed to load managers</AlertTitle>
        <AlertDescription>
          There was a problem loading the manager data. Please try refreshing the page or contact support if the problem persists.
        </AlertDescription>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="mt-2"
        >
          Refresh Page
        </Button>
      </Alert>
    )
  }

  //Memoize since the props passed to the cards don't change when filtering
  const InfluencerCardItem = memo(({ influencer, managers }: { influencer: InfluencerWithManager; managers: ManagerBase[] }) => {
    return (
      <Card
        className="hover:shadow-md transition-shadow bg-white border-border/40"
        key={influencer.id}
      >
        <CardHeader className="space-y-3 p-4">
          <CardTitle className="text-lg font-semibold text-foreground">
            {influencer.firstName} {influencer.lastName}
          </CardTitle>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Manager:</span>
              <span className="ml-2">
                {influencer.manager ? (
                  `${influencer.manager.firstName} ${influencer.manager.lastName}`
                ) : (
                  <span className="italic">No manager assigned</span>
                )}
              </span>
            </div>

            <Modal
              currentManager={influencer.manager}
              influencerId={influencer.id}
              managers={managers || []}
            />
          </div>
        </CardHeader>

        <CardContent className="pt-3 border-t p-4">
          <div className="flex flex-wrap gap-1.5">
            {influencer.socialMediaAccounts.map(account => (
              <SocialMediaBadge
                platform={account.platform}
                username={account.username}
                key={account.id}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  })
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 py-4 max-w-7xl mx-auto">
      {influencers.map(influencer => (
        <InfluencerCardItem
          key={influencer.id}
          influencer={influencer}
          managers={managers || []}
        />
      ))}
    </div>
  )
}
