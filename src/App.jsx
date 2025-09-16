import ConferenceEvent from "./components/ConferenceEvent"

function App() {
  return (
    <>
      <main 
        className="flex flex-col items-center justify-center min-h-screen text-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2018/07/05/14/45/conference-3518465_1280.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-serif max-w-4xl leading-tight">
            Your go to Conference Expense Planner
          </h1>
          <button className="my-8 px-8 py-3 rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white font-bold text-lg shadow-lg">
            Get Started
          </button>
        </div>
      </main>

      <section className="bg-gray-100 py-16">
        <ConferenceEvent />
      </section>
    </>
  )
}

export default App