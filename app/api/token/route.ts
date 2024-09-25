import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    // Extract useful information from the request object
    const requestInfo = {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers), // Convert headers to an object
    };
  
    // Log the full request object (for debugging purposes)
    console.log("Entry point GET", request);
  
    // Return only the extracted info in the response
    return NextResponse.json({
      requestInfo,
    });
  }

  export async function POST(request: Request) { 
    // Parse the body of the request
    const data = await request.json();

    // Extract relevant information from the request object
    const requestInfo = {
        url: request.url,
        method: request.method,
        headers: Object.fromEntries(request.headers), // Convert headers to an object
    };

    // Log the data and the request object for debugging purposes
    console.log("Entry point POST", { data, requestInfo });

    // Return both the parsed body and the request information
    return NextResponse.json({ 
        data,
        requestInfo
    });
}