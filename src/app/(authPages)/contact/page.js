export default function Contact({  }) {
  return (
    <div className = "flex justify-center items-center flex-col">
      <h1 className="main-title">Contact Us</h1>

      <div className="section-1 w-1/3">
        <h2 className="h2-1">Contact Information</h2>
        <p className="p-1">Email: info@ExampleProject.com</p>
        <p className="p-1">Phone: 555 555 555</p>
        <p className="p-1">
          Address: 1 Example Street, Example Region, Example City
        </p>
      </div>

      <div className=" section-1 flex justify-center items-center flex-col w-1/3">
        <h2 className="second-title">Subscribe to Us</h2>
        <form>
          <label htmlFor="name" className="p-1 ">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="subscribe-input"
          />

          <label htmlFor="phone" className="p-1 ">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            className="subscribe-input"
          />

          <label htmlFor="email" className="p-1 ">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="subscribe-input"
          />
          <button className="btn-custom">Subscribe</button>
        </form>
      </div>
    </div>
  );
}
