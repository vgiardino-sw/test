import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const response = await fetch('https://costmanagementapi.azurewebsites.net/api/test/public');
        const data = await response.json();

        return NextResponse.json({ 
            message: 'Data fetched successfully!',
            data: data
        });
    } catch (error) {
        return NextResponse.json({ 
            message: 'Error fetching data.',
        }, { status: 500 });
    }
}
