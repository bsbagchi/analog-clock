// app/api/get-time/route.js
export async function GET() {
    // Get the current time in UTC
    const now = new Date();

    // Convert to Indian Standard Time (IST)
   // const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istTime = new Date(now.getTime() );
    // console.log(istTime);
    // Extract hours, minutes, and seconds
    const hours = istTime.getHours() % 12; // 12-hour format
    const minutes = istTime.getMinutes();
    const seconds = istTime.getSeconds();
    // console.log(hours,minutes,seconds);

    // Format time as HH:MM:SS
    const time = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    // Respond with the current time in IST
    return new Response(JSON.stringify({ time }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
