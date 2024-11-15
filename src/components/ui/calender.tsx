import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'; // Importing icons
import { MdToday } from 'react-icons/md'; // Importing today icon

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([] as { date: string, name: string, startTime: string, endTime: string }[]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', startTime: '', endTime: '' });
  const [activeDate, setActiveDate] = useState(null);

  const handleAddEvent = () => {
    if (newEvent.startTime >= newEvent.endTime) {
      alert('Start time must be before end time.');
      return;
    }
    console.log(activeDate)
    let date2 = activeDate.toISOString()
    console.log(date2)
    console.log(newEvent)
    setEvents([...events, {
        name: newEvent.name,
        date: activeDate,
        startTime: newEvent.startTime,
        endTime: newEvent.endTime
    }]);
    setNewEvent({ name: '', date: activeDate, startTime: '', endTime: '' });
    setShowModal(false);
  };

  const handleDeleteEvent = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const getWeeksInMonth = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const weeks = [];

    let currentWeek = [];
    for (let i = 0; i < startOfMonth.getDay(); i++) {
      currentWeek.push(null);
    }
    for (let day = 1; day <= endOfMonth.getDate(); day++) {
      currentWeek.push(new Date(date.getFullYear(), date.getMonth(), day));
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }
    return weeks;
  };

  const weeks = getWeeksInMonth(currentDate);

  // Highlight today's date
  const isToday = (date) => {
    const today = new Date();
    return date && date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  // Close modal when clicking outside
  const handleModalClose = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setShowModal(false);
    }
  };

  return (
    <div className="p-5 max-w-screen-lg mx-auto w-full">
      <h1 className="text-3xl font-bold mb-4 text-center">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          {/* <button onClick={() => setCurrentDate(new Date(currentDate.setFullYear(currentDate.getFullYear() - 1)))} className="bg-blue-600 text-white px-3 py-2 rounded shadow hover:bg-blue-700 transition flex items-center">
            <FaChevronLeft className="mr-1" />{"<<"}
          </button> */}
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="bg-cyan-600 text-white px-3 py-2 rounded shadow hover:bg-cyan-700 transition flex items-center">
            <FaChevronLeft className="mr-1" />{"Previous Month"}
          </button>
        </div>
        <button onClick={() => setCurrentDate(new Date())} className="bg-teal-600 text-white px-4 py-2 rounded shadow hover:bg-teal-700 transition flex items-center">
          <MdToday className="mr-1" /> Back to Today
        </button>
        <div className="flex items-center space-x-2">
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="bg-cyan-600 text-white px-3 py-2 rounded shadow hover:bg-cyan-700 transition flex items-center">
            Next Month<FaChevronRight className="ml-1" />
          </button>
          {/* <button onClick={() => setCurrentDate(new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)))} className="bg-blue-600 text-white px-3 py-2 rounded shadow hover:bg-blue-700 transition flex items-center">
            {">>"}<FaChevronRight className="ml-1" />
          </button> */}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0 border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        {daysOfWeek.map(day => (
          <div key={day} className="bg-gray-200 p-2 text-center font-semibold">{day}</div>
        ))}
        {weeks.map((week, weekIndex) => (
          week.map((date, dayIndex) => (
            <div 
              key={`${weekIndex}-${dayIndex}`} 
              className={`border border-black flex flex-col items-center justify-center h-32 transition-all duration-200 ease-in-out ${date ? (isToday(date) ? 'bg-blue-300' : (dayIndex === 0 || dayIndex === 6 ? 'bg-neutral-100' : 'bg-white')) : 'bg-transparent'} hover:bg-gray-300 overflow-hidden`}
              onClick={() => date && (setActiveDate(date), setShowModal(true))}
            >
              {date && (
                <div className="flex flex-col items-center h-full overflow-y-auto">
                  <p className="font-bold">{date.getDate()}</p>
                  <div className="flex flex-col overflow-y-auto max-h-20">
                    {/* hellyeah */}
                    {events.filter(event =>  new Date(event.date).getFullYear() === date?.getFullYear() &&
  new Date(event.date).getMonth() === date?.getMonth() &&
  new Date(event.date).getDate() === date?.getDate()).map((event, index) => (
                      <div key={index} className="text-sm">
                        {event.startTime} - {event.name}
                        <button onClick={(event) => handleDeleteEvent(event,index)} className="text-red-500 font-extrabold ml-2">X</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ))}
      </div>
      {showModal && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleModalClose}>
          <div className="bg-white p-5 rounded shadow-lg relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-red-500">
              <FaTimes />
            </button>
            <h2 className="text-xl mb-4">Add Event</h2>
            <input type="text" placeholder="Event Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} className="border p-2 mb-2 w-full" />
            <p>{activeDate.toISOString().split('T')[0]}</p>
            <input type="time" value={newEvent.startTime} onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })} className="border p-2 mb-2 w-full" />
            <input type="time" value={newEvent.endTime} onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })} className="border p-2 mb-2 w-full" />
            <button onClick={handleAddEvent} className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition">Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;