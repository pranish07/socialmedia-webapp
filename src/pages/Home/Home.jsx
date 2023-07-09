import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar"
import { useData } from '../../contexts/DataContext'
import { RightSidebar } from '../../components/RIghtSiderbar/RightSidebar'

export const Home = () => {
  const {dataState:{posts,users},setIsLoading} = useData();
  console.log(users,posts)

  return (
    <div>
        <Navbar />
        <div>
        <LeftSidebar />
        <RightSidebar />
        </div>
    </div>
  )
}
