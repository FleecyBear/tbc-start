import './About.css';

export default function About() {
  return (
    <div className="About-Main">
      <h1 className="about-title">About TBC Project</h1>
      
      <section className="small-sections">
        <h2 className="small-title">Welcome to the TBC Project!</h2>
        <p className="small-text">
          Our mission is to spread joy and positivity through our adorable panda toys.
          Inspired by the gentle nature of these beloved animals, we aim to bring a smile to children and adults alike.
        </p>
      </section>
      
      <section className="small-sections">
        <h2 className="small-title">Our Panda Toys</h2>
        <p className="small-text">
          Our collection features a range of panda toys, from cuddly plush companions to fun educational figures.
          Each toy is crafted with care using eco-friendly materials, ensuring that our products are not only fun but also safe for the environment.
        </p>
      </section>

      <section className="small-sections">
        <h2 className="small-title">Why Pandas?</h2>
        <p className="small-text">
          Pandas are not just cute; they symbolize peace and conservation.
          By choosing our panda toys, you are not only getting a delightful companion but also supporting efforts to protect these amazing creatures in the wild.
        </p>
      </section>
    </div>
  );
}
