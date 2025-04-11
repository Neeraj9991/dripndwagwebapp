import Image from "next/image";

const Reviews = () => {
  const reviews = [
    {
      id: "1",
      customer: {
        display_name: "Jane Doe",
        avatar_url: "/user1.png",
      },
      rating: 5,
      heading: "Love it!",
      body: "The fabric is so soft and the fit is perfect. Highly recommend!",
      media: [{ id: "img1", url: "/review1.jpg" }],
    },
    {
      id: "2",
      customer: {
        display_name: "John Smith",
        avatar_url: "/user2.png",
      },
      rating: 4,
      heading: "Great value",
      body: "Nice quality T-shirt for the price. I’ll definitely buy more.",
      media: [],
    },
    {
      id: "3",
      customer: {
        display_name: "Emily Rivers",
        avatar_url: "/user3.png",
      },
      rating: 5,
      heading: "Super comfy",
      body: "Wore it all day and it still felt amazing. Great for daily wear.",
      media: [{ id: "img3", url: "/review2.jpg" }],
    },
  ];

  return (
    <></>
    // <div className="flex flex-col gap-10">
    //   {reviews.map((review) => (
    //     <div className="flex flex-col gap-4" key={review.id}>
    //       {/* USER */}
    //       <div className="flex items-center gap-4 font-medium">
    //         <Image
    //           src={review.customer.avatar_url}
    //           alt="User avatar"
    //           width={32}
    //           height={32}
    //           className="rounded-full"
    //         />
    //         <span>{review.customer.display_name}</span>
    //       </div>

    //       {/* STARS */}
    //       <div className="flex gap-1">
    //         {Array.from({ length: review.rating }).map((_, index) => (
    //           <Image
    //             src="/star.png"
    //             alt="star"
    //             key={index}
    //             width={16}
    //             height={16}
    //           />
    //         ))}
    //       </div>

    //       {/* HEADING + BODY */}
    //       {review.heading && <p className="font-semibold">{review.heading}</p>}
    //       {review.body && <p className="text-gray-700">{review.body}</p>}

    //       {/* MEDIA */}
    //       <div className="flex gap-2 flex-wrap">
    //         {review.media.map((media) => (
    //           <Image
    //             src={media.url}
    //             key={media.id}
    //             alt="review-media"
    //             width={100}
    //             height={50}
    //             className="object-cover rounded"
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Reviews;
