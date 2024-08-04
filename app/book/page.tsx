'use client'
import React, { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import BookingForm from '@/components/book/BookingForm'
import EventCalendar from '@/components/book/EventCalendar'
import BookingService from '@/services/bookings.service'
import BookingDetails from '@/components/book/BookingDetails'
import Image from 'next/image'
import Logo from '@/assets/logo.png'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const BookingPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [hasBooking, setHasBooking] = useState<boolean>(false)
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const userEmail = useSelector(
    (state: RootState) => state.auth.userData.userData.email
  )

  useEffect(() => {
    const bookingService = BookingService.getInstance()
    bookingService
      .listBookings()
      .then((response) => {
        const userBooking = response.documents.find(
          (booking: any) => booking.email === userEmail
        )

        if (userBooking) {
          setHasBooking(true)
          setBookingDetails(userBooking)
        }
      })
      .catch((error) => {
        console.error('Error listing bookings:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [userEmail])

  return (
    <div className="flex items-center h-[64vh] px-3 gap-x-1">
      <div className="w-full lg:w-[55%] border border-black/75 rounded-3xl h-full p-2">
        <EventCalendar />
      </div>
      <div className="w-full lg:w-[45%] h-full">
        {loading ? (
          <div className="h-full w-full rounded-3xl flex items-center justify-center bg-black text-white">
            <Image
              src={Logo}
              alt="GURKHA WARRIORS"
              className="w-28 mr-2 cursor-pointer"
            />
          </div>
        ) : hasBooking ? (
          <BookingDetails bookingDetails={bookingDetails} />
        ) : (
          <BookingForm />
        )}
      </div>
    </div>
  )
}

export default ProtectedRoute(BookingPage)
