'use client'

import { useState, useEffect } from 'react'
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import Link from 'next/link'
import Image from 'next/image'
import { getCapaigns } from '../../actions/user'
import { useRouter } from 'next/navigation'

type Campaign = {
  id: number
  creatorId: number
  title: string
  description: string | null
  image: string | null
  category: string | null
  goal: number
  deadline: string
  fundsRaised: number
  active: boolean
  createdAt: string
  updatedAt: string
  creator: {
    name: string
  }
}

export default function CampaignListing() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('newest')
  const userId = localStorage.getItem('id')

  const router = useRouter()

  useEffect(() => {
    // Simulating API call to fetch campaigns
    const fetchCampaigns = async () => {
      // Replace this with actual API call
      const response = await getCapaigns();
      const data = response;
      //@ts-ignore
      setCampaigns(data)
      //@ts-ignore
      setFilteredCampaigns(data)
    }
    fetchCampaigns()
  }, [])

  useEffect(() => {
    let result = campaigns

    // Apply filter
    if (filter !== 'all') {
      result = result.filter(campaign => campaign.category === filter)
    }

    // Apply search
    if (searchTerm) {
      result = result.filter(campaign => 
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply sort
    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'popular':
        result.sort((a, b) => b.fundsRaised - a.fundsRaised)
        break
      case 'endingSoon':
        result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
        break
    }

    setFilteredCampaigns(result)
  }, [campaigns, filter, searchTerm, sort])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Active Campaigns</h1>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white rounded-md p-2"
        >
          <option value="all">All Categories</option>
          <option value="technology">Technology</option>
          <option value="art">Art</option>
          <option value="music">Music</option>
          {/* Add more categories as needed */}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white rounded-md p-2"
        >
          <option value="newest">Newest</option>
          <option value="popular">Popular</option>
          <option value="endingSoon">Ending Soon</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <Link href={`/live-stream/viewer/${campaign.id}`} key={campaign.id}>
            <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{campaign.title}</CardTitle>
                <p className="text-sm text-gray-400">by {campaign.creator.name}</p>
              </CardHeader>
              <CardContent>
                {campaign.image && (
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-sm text-gray-300 mb-4">{campaign.description?.slice(0, 100)}...</p>
                <Progress value={(campaign.fundsRaised / campaign.goal) * 100} className="mb-2" />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>${campaign.fundsRaised.toLocaleString()} raised</span>
                  <span>${campaign.goal.toLocaleString()} goal</span>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-400">
                  {new Date(campaign.deadline) > new Date() 
                    ? `${Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left` 
                    : 'Ended'}
                </p>
              </CardFooter>
                  {
                    userId === campaign.creatorId.toString() ? (
                      <button className='px-4 py-2 bg-blue-500 rounded-lg' onClick={()=>{
                        router.push(`/live-stream/creator/${campaign.id}`)
                      }}>
                        Start Crowd Funding Session
                      </button>
                    ) : (
                      <button className='px-4 py-2 bg-blue-500 rounded-lg'
                        onClick={()=>{
                          router.push(`/live-stream/viewer/${campaign.id}`)
                        }}
                      
                      >
                        Join Crowd Funding Session
                      </button>
                    )


                    
                  }

            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}