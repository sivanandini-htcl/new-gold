// export const subscribeMetalPrices = (onMessage, onError) => {
//     const eventSource = new EventSource("https://api.dgi.gold/api/v1/metals/subscribe-live");
  
//     eventSource.onmessage = (event) => {
//         try {
//             const data = JSON.parse(event.data);
//             // console.log(data)
//             onMessage(data);
//         } catch (err) {
//             console.error("JSON Parse Error:", err);
//         }
//     };
//     eventSource.addEventListener("price-update", (event) => {
//         try {
//             const data = JSON.parse(event.data);
//             // console.log(data)
            
            
//             onMessage(data);
//         } catch (err) {
//             console.error("Price Update Parse Error:", err);
//         }
//     });
//     eventSource.onerror = (error) => {
//         console.error("SSE Error:", error);
//         if (onError) onError(error);
//     };

//     return eventSource;
// };