import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

export async function subscribeUserToPush(registration, publicVapidKey) {
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  // Send subscription to backend
  try {
    await axios.post(`${BASE_URL}/api/subscribe`,{ 
      subscription : JSON.stringify(subscription)
    }, {
      headers : {
        "Content-Type" : 'application/json'
      },
      withCredentials : true
    });
    return 
  } catch (error) {
    return console.log("Subscribtion push error", error);
  }
}