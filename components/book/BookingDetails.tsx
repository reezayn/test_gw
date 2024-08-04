import Link from 'next/link'
import React from 'react'

const BookingDetails = ({ bookingDetails }: { bookingDetails: any }) => {
  return (
    <div className="p-8 bg-black text-white rounded-3xl h-full flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold mt-3 mb-6 text-gurkhaGreen underline">
          Your Booking Details
        </h2>
        <p className="my-2">
          <span className="text-gurkhaGreen font-semibold">Name:</span>{' '}
          {bookingDetails.name}
        </p>
        <p className="my-2">
          <span className="text-gurkhaGreen font-semibold">Email:</span>{' '}
          {bookingDetails.email}
        </p>
        <p className="my-2">
          <span className="text-gurkhaGreen font-semibold">Phone:</span>{' '}
          {bookingDetails.phone}
        </p>
        <p className="my-2">
          <span className="text-gurkhaGreen font-semibold">Address:</span>{' '}
          {bookingDetails.address}
        </p>
        <p className="my-2">
          <span className="text-gurkhaGreen font-semibold">
            How You Knew About Us:
          </span>{' '}
          {bookingDetails.howDidYouKnow}
        </p>
      </div>
      <div className="text-sm">
        <p className="my-2">You will be contacted via email or phone soon.</p>
        <p className="my-2 italic">
          <Link href="/contact" className="text-gurkhaGreen underline">
            Contact us
          </Link>{' '}
          for any queries.
        </p>
      </div>
    </div>
  )
}

export default BookingDetails
