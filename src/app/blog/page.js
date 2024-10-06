"use client"
import "./Blog.css";
import BlogItems from "./blog-items/blogitems.js";
import { useEffect, useState } from 'react';

export default function Blog() {
  const blogItemsData = [
    {
      blogTitle: "Panda twins move into their own bed at Zoo Berlin",
      blogDescription:
        "Four weeks after their birth, the little panda cubs at Zoo Berlin still have one thing above all else on their daily programme: lots and lots of sleep! And that goes particularly well in the panda girls' new, cosy “bed”, which was built especially for their needs in Zoo Berlin's workshop. They stretch and stretch with relish, grunt softly, yawn briefly and as soon as they have found the most comfortable lying position, they return to the land of dreams.",
    },

    {
      blogTitle: "Two pounds of panda-cuteness",
      blogDescription:
        "Drinking, sleeping, growing and lots of cuddles with mum Meng Meng (11) - that's what daily panda life at Zoo Berlin looks like at the moment. The two panda cubs, who were born on 22 August, are developing rapidly: In the meantime, both have even cracked the 1kg mark. Size is a helpful distinguishing criterion for the panda team. The larger and first-born weighs 1202 grams, the smaller 1140 grams. They have doubled their weight in the last 14 days. Biologist and panda curator Dr Florian Sicks is very pleased: ‘We are completely happy with the great development of the two cubs. Following the colouring of their skin, they are now also growing black fur. Later, the skin underneath will turn pink again. So far, both are still feeding exclusively on their mother's milk. However, the drinking phases with their mother are now shorter, but the cuddling phases are longer. We can now also observe how Meng Meng instinctively stimulates the digestion of the two cubs through extensive grooming sessions.’ The panda cubs now only drink three to four times a day, about 70-80 ml each time. Their eyes are still closed. ",
    },
    {
      blogTitle: "Panda Update from Zoo Berlin",
      blogDescription:
        "Zoo Berlin has been floating in a baby panda bubble for five days now. Day and night, the panda twins are lovingly cared for by their mother Meng Meng (11) and the experienced panda team at Zoo Berlin and the Chengdu Panda Base. Every hour, the two cubs take turns drinking and cuddling with their mum bear. Thanks to the nutritious mother's milk, the two cubs have already regained their birth weight and now even weigh a few grams more: the first-born cub currently weighs 180 g, the second-born 145 g. As is usual with many mammals, giant panda cubs initially lose weight in the first few days after birth. The increase causes cautious optimism among everyone involved, as the first few days are crucial. ‘In the first month and especially in the first 14 days, cub mortality is at its highest and is around a quarter higher than in any other age group,’ reports biologist and panda curator Dr Florian Sicks. ‘Panda cubs are born without a functioning immune system and are therefore very vulnerable in the first few days. They can easily catch a cold as they are not yet able to maintain their body temperature on their own. The mother's milk provides them with important first defences and ensures that the young animals become stronger.’ In the first 14 days, the young drink around eight to twelve times a day.",
    },
    {
      blogTitle: "Little bears with a big appetite",
      blogDescription:
        "Lying in the keeper’s arms with a dreamy expression, Pit takes the bottle in his furry paws. Within minutes, he has emptied the entire contents. Once a day, Zoo Berlin’s panda twins are bottle fed to supplement the milk they receive from mum Meng Meng.",
    },
    {
      blogTitle: "Ready for their first outing",
      blogDescription:
        "The panda twins were also given a worming treatment. Zoo and Tierpark Director Dr Andreas Knieriem wanted to personally make sure that the little ones were fit for their first outing. “We are very satisfied,” he reported. “The cubs are healthy, curious, and following their mother around well – they are more than ready for their first outing.” In preparation, the interior of the Panda Garden has been “cub-proofed”: Meng Meng’s large wooden climbing apparatus has been remodelled into three small climbing stations, and gaps have been filled so that the twins don’t get their paws stuck or slip down any cracks during their explorations. The pool has also been emptied, lined with a thick layer of soft pine mulch, and equipped with an entrance and exit. It will still be about two to four months before the little bears attempt to properly eat solid food, but they are already trying out their small sharp teeth on bamboo poles. ",
    },
  ];
  const [blogList, setBlog] = useState();
  ///immediate invoke function
  useEffect(()=>{
    (async function getBlogPosts(){
        try {
            const jsonData = await fetch('https://dummyjson.com/posts');
            const data = await jsonData.json();
            console.log(data)
            setBlog(data.posts)
        } catch (error) {
            console.log(error)
        }
    })();
},[])
  return (
    <>
      <div className="BlogPageWelcome">
        <p className="BlogPageTitle">Blogs</p>
        <p className="BlogPageTitleDescription">Learn more about pandas</p>
      </div>
      <div className="BlogItems">
        {blogItemsData.map((item, index) => (
          <BlogItems
            key={index}
            blogTitle={item.blogTitle}
            blogDescription={item.blogDescription}
          />
        ))}
      </div>
    </>
  );
}
