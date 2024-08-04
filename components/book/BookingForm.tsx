'use client'
import React, { useEffect, useState } from 'react'
import BookingService from '@/services/bookings.service'
import { AuthService } from '@/services'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const BookingForm: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [howDidYouKnow, setHowDidYouKnow] = useState('')
  const [hasBooking, setHasBooking] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    const authService = AuthService.getInstance()
    authService.getUser().then((userData) => {
      if (userData) {
        setEmail(userData.email)
      } else {
        console.log('User not found')
      }
    })

    const bookingService = BookingService.getInstance()
    bookingService
      .listBookings()
      .then((response) => {
        const userBooking = response.documents.find(
          (booking: any) => booking.email === email
        )

        if (userBooking) {
          setHasBooking(true)
        }
      })
      .catch((error) => {
        console.error('Error checking existing bookings:', error)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (hasBooking) {
      alert('You already have a booking.')
      return
    }

    const bookingService = BookingService.getInstance()
    try {
      const bookingData = { name, email, phone, address, howDidYouKnow }
      const response = await bookingService.createBooking(bookingData)
      console.log('Booking created:', response)
      toast.success('Booking successful!')
      window.location.reload()
    } catch (error) {
      console.error('Error creating booking:', error)
      toast.error('There was an error creating your booking.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-black text-white rounded-3xl h-full"
    >
      <h2 className="col-span-2 text-2xl font-bold mb-4 text-center">
        Book Your Slot
      </h2>

      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2 font-medium">
          Name <span className="mx-2 text-gurkhaGreen text-lg">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          className="p-3 border rounded-3xl bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gurkhaGreen"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 font-medium">
          Email <span className="mx-2 text-gurkhaGreen text-lg">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          readOnly
          className="p-3 border rounded-3xl bg-gray-800 focus:outline-none cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="phone" className="mb-2 font-medium">
          Phone
          <span className="mx-2 text-gurkhaGreen text-lg">*</span>
        </label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
          className="p-3 border rounded-3xl bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gurkhaGreen"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="address" className="mb-2 font-medium">
          Address <span className="mx-2 text-gurkhaGreen text-lg">*</span>
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          required
          className="p-3 border rounded-3xl bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gurkhaGreen"
        />
      </div>

      <div className="flex flex-col md:col-span-2">
        <label htmlFor="howDidYouKnow" className="mb-2 font-medium">
          How did you come to know about this show?{' '}
          <span className="mx-2 text-gurkhaGreen text-lg">*</span>
        </label>
        <input
          type="text"
          id="howDidYouKnow"
          value={howDidYouKnow}
          onChange={(e) => setHowDidYouKnow(e.target.value)}
          placeholder="Enter how you came to know"
          required
          className="p-3 border rounded-3xl bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gurkhaGreen"
        />
      </div>

      <div className="md:col-span-2 flex justify-center">
        <button
          type="submit"
          className="bg-gurkhaGreen text-black py-3 px-8 rounded-3xl font-medium hover:bg-gurkhaGreen/90 transition-colors"
        >
          Book
        </button>
      </div>
    </form>
  )
}

export default BookingForm
