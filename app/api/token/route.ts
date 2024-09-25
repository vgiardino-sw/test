import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) { 
    console.log("Entry point get", request)
    return NextResponse.json({ 
        message: `Hello from the API-GET! The request was ${request}.`
    });
}

export async function POST(request: Request) { 
    console.log("Entry point post", request)
    return NextResponse.json({ 
        message: `Hello from the API-POST! The request was ${request}.`
    });
}