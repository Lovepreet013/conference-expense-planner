import ConferenceEvent from "./components/ConferenceEvent"

function App() {
  return (
    <>
      <main className="text-center mt-[15em] h-[100vh]">
        <h1 className="text-6xl font-bold font-serif">Your go to Conference Expense Planner</h1>
        <button className="my-[2em] border-2 px-5 py-2 rounded-3xl cursor-pointer bg-blue-400 hover:bg-blue-300 font-bold">Get Started</button>
      </main>

      <section>
        <ConferenceEvent/>
      </section>
    </>
  )
}

export default App
