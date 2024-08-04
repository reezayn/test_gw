import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import EventService from '@/services/events.service'
import './EventCalendar.css' // Import your custom CSS

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<
    { title: string; start: string; end: string }[]
  >([])

  useEffect(() => {
    const eventService = EventService.getInstance()
    eventService.fetchEvents().then((data) => {
      console.log('Fetched event documents:', data)

      // Process event dates to remove time and format correctly
      const eventDates = data.map((doc: any) => {
        const startDate = doc.startDate.split('T')[0] // Get the start date part only (YYYY-MM-DD)
        const endDate = doc.endDate.split('T')[0] // Get the end date part only (YYYY-MM-DD)
        console.log('Processing event document:', {
          title: doc.eventName || 'Event',
          startDate,
          endDate,
        })
        return {
          title: doc.eventName || 'GW EVENT',
          start: startDate,
          end: endDate,
        }
      })

      setEvents(eventDates)
    })
  }, [])

  return (
    <div className="h-full w-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="100%"
        contentHeight="auto"
        aspectRatio={1.35}
        headerToolbar={{
          left: 'prev,next', // Adds navigation buttons for previous/next month
          center: 'title',
          right: '', // Removes other view options
        }}
        eventColor="#e0f465" // Customize the event color
        dayMaxEventRows={3} // Limit the number of events shown per day
        displayEventTime={false} // Hide the event time
        eventDisplay="block" // Ensures the event spans the entire day's box
      />
    </div>
  )
}

export default EventCalendar
