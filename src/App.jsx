import ConferenceEvent from "./components/ConferenceEvent"

function App() {
  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="sticky top-0 bg-blue-950 z-20 flex justify-between px-8 py-5 items-center">
        <div className="logo">
          <h1 className="text-xl font-bold text-yellow-400">Conference Expense Planner</h1>
        </div>

        <ul className="flex items-center gap-6 text-white font-semibold">
          <li><a href="#venue" className="hover:text-yellow-400">Venue</a></li>
          <li><a href="#addOn" className="hover:text-yellow-400">Add-ons</a></li>
          <li><a href="#meals" className="hover:text-yellow-400">Meals</a></li>
          <li>
            <a 
              href="#total" 
              className="bg-yellow-400 text-blue-950 px-4 py-2 rounded font-bold hover:bg-yellow-500 transition"
            >
              Show Details
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <main
        className="flex flex-col items-center justify-center min-h-screen text-left bg-cover bg-center relative px-8 lg:px-20"
        style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2018/07/05/14/45/conference-3518465_1280.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-950 opacity-80"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between w-full max-w-6xl">
          {/* Left Heading */}
          <div className="text-white lg:w-1/2">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Conference <br /> Expense <br /> Planner
            </h1>
            <p className="mt-4 text-xl">Plan your next major event with us!</p>
            <button className="mt-8 px-8 py-3 rounded-full cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 text-blue-950 font-bold text-lg shadow-lg">
              Get Started
            </button>
          </div>

          {/* Right Info Box */}
          <div className="bg-white/10 backdrop-blur-md text-white p-8 rounded-xl mt-10 lg:mt-0 lg:ml-10 lg:w-1/2 shadow-lg">
            <p className="mb-4">
              Welcome to BudgetEase Solutions, your trusted partner in simplifying
              budget management and financial solutions. At BudgetEase, we
              understand the importance of effective budget planning and strive to
              provide intuitive, user-friendly solutions to meet the diverse needs
              of our clients.
            </p>
            <p className="mb-4">
              With a commitment to efficiency and innovation, we empower
              individuals and businesses to take control of their finances and
              achieve their goals with ease.
            </p>
            <p>
              At BudgetEase Solutions, our mission is to make budgeting effortless
              and accessible for everyone. Whether you're a small business owner,
              a busy professional, or an individual looking to manage your personal
              finances, we offer tailored solutions to streamline your budgeting
              process.
            </p>
          </div>
        </div>
      </main>

      {/* Conference Event Section */}
      <section className="bg-gray-100 py-16">
        <ConferenceEvent />
      </section>
    </div>
  )
}

export default App
