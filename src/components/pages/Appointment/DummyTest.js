// import React, { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import customAxios from "../../../axios/custom";
// import Spinner from "../../../UI/Spinner";

// const DummyTest = () => {
//   const [appointmentDataResult, setAppointmentDataResult] = useState([]);
//   //   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const fetchData = async () => {
//     try {
//       const response = await customAxios.post("/patient/appointments", {
//         paginate: 1,
//         page: page, // Use the current page value
//       });
//       console.log(response, "response");
//       console.log(response?.data?.data?.result, "appointmentData");

//       setAppointmentDataResult((prevAppointmentDataResult) => [
//         ...prevAppointmentDataResult,
//         ...response?.data?.data?.result,
//       ]);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, [page]);
//   //   const fetchMoreAppointmentData = () => {
//   //     setPage((prevPage) => prevPage + 1);
//   //     const fetchData = async () => {
//   //       try {
//   //         const response = await customAxios.post("/patient/appointments", {
//   //           paginate: 1,
//   //           page: page, // Use the current page value
//   //         });
//   //         console.log(response, "response");
//   //         console.log(response?.data?.data?.result, "appointmentData");
//   //         // Combine old and new data
//   //         setAppointmentDataResult(
//   //           appointmentDataResult.concat(response?.data?.data?.result)
//   //         );
//   //         console.log(appointmentDataResult, "appointmentDataResult");
//   //       } catch (error) {
//   //         console.log(error);
//   //       }
//   //     };

//   //     fetchData();
//   //   };
//   const handelInfiniteScroll = async () => {
//     // console.log("scrollHeight" + document.documentElement.scrollHeight);
//     // console.log("innerHeight" + window.innerHeight);
//     // console.log("scrollTop" + document.documentElement.scrollTop);
//     try {
//       if (
//         window.innerHeight + document.documentElement.scrollTop + 1 >=
//         document.documentElement.scrollHeight
//       ) {
//         setLoading(true);
//         setPage((prev) => prev + 1);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handelInfiniteScroll);
//     return () => window.removeEventListener("scroll", handelInfiniteScroll);
//   }, []);
//   return (
//     <>
//       <h2>Testing Infinie scrolll</h2>
//       {appointmentDataResult?.map((data, index) => {
//         return (
//           <div
//             style={{
//               border: "1px solid black",
//               margin: "10px",
//               padding: "10px",
//             }}
//             key={index}
//           >
//             <p className="text-[#292F33] font-sansSemibold text-[15px]">
//               {data?.doctor_name}
//               {/* Alexander O. Babazadeh */}
//             </p>
//             <p className="text-[#9597A6] font-sansLight text-xs py-1">
//               {/* {data.tag1} */}
//               Scheduled for: {data?.appointment_date || "Thurs, Feb 18th"}
//             </p>
//             <p className="text-[#292F33] text-sm py-1">
//               {/* {data.tag2} */}
//               {data?.medical_condition}
//             </p>
//           </div>
//         );
//       })}
//       {loading && <p>Loading...</p>}
//     </>
//   );
// };

// export default DummyTest;
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const DummyTest = () => {
  const [items, setItems] = useState(Array.from({ length: 2 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 500) {
      setHasMore(false);
      return;
    }

    // Simulating a fake async api call that sends
    // 20 more records after a delay
    setTimeout(() => {
      setItems((prevItems) => [...prevItems, ...Array.from({ length: 2 })]);
    }, 500);
  };

  return (
    <div>
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height={70}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((i, index) => (
          <div style={style} key={index}>
            div - #{index}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default DummyTest;
