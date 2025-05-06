"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface CricketScore {
  matchInfo: {
    team1: { teamName: string, teamScore: string }
    team2: { teamName: string, teamScore: string }
    status: string
    matchType: string
  }
}

export default function CricketScores() {
  const [scores, setScores] = useState<CricketScore | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/41881/comm',
          headers: {
            'x-rapidapi-key': '66ae059226mshd14dfe2261cf4d7p1caeadjsna5277044e9e3',
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
          }
        }

        const response = await axios.request(options)
        if (response.data && response.data.matchInfo) {
          setScores(response.data)
        } else {
          setError('Invalid match data received')
        }
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch cricket scores')
        setLoading(false)
      }
    }

    fetchScores()
    const interval = setInterval(fetchScores, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (error) {
    return (
      <Card className="bg-destructive/10">
        <CardContent className="p-4">
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Live Cricket Scores</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        ) : scores && scores.matchInfo ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{scores.matchInfo.team1.teamName}</span>
              <span className="tabular-nums">{scores.matchInfo.team1.teamScore}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">{scores.matchInfo.team2.teamName}</span>
              <span className="tabular-nums">{scores.matchInfo.team2.teamScore}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {scores.matchInfo.status}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground">No live matches at the moment</p>
        )}
      </CardContent>
    </Card>
  )
}