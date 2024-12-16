export default function Contact() {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold text-center mt-8 mb-6 text-gray-800
      dark:text-gray-300">Contact Us</h1>

      <div className="section-1 w-1/3">
        <h2 className="h2-1">Contact Information</h2>
        <p className="p-1">Email: info@ExampleProject.com</p>
        <p className="p-1">Phone: 555 555 555</p>
        <p className="p-1">
          Address: 1 Example Street, Example Region, Example City
        </p>
      </div>

      <div className="section-1 flex justify-center items-center flex-col w-1/3">
        <h2 className="h2-1">Subscribe to Us</h2>
        <form className="flex flex-col w-full">
          <label htmlFor="name" className="p-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="mb-4 p-2 border border-gray-300 rounded"
          />

          <label htmlFor="phone" className="p-1">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            className="mb-4 p-2 border border-gray-300 rounded" 
          />

          <label htmlFor="email" className="p-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="mb-4 p-2 border border-gray-300 rounded" 
          />
          
          <button className="mt-4 px-4 py-2 btn-2">Subscribe</button>
        </form>
      </div>
    </div>
  );
}
