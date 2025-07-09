// app/api/account/updateLabels/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // ✅ shared instance

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accountId, extraLabel1, extraLabel2, extraLabel3 } = body;

    if (!accountId) {
      return NextResponse.json({ error: 'Missing accountId' }, { status: 400 });
    }

    const updateData: Record<string, string> = {};
    if (extraLabel1?.trim()) updateData.extra1Label = extraLabel1.trim(); // ✅ lowercase
    if (extraLabel2?.trim()) updateData.extra2Label = extraLabel2.trim();
    if (extraLabel3?.trim()) updateData.extra3Label = extraLabel3.trim();

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ message: 'Nothing to update' }, { status: 400 });
    }

    const updated = await prisma.account.update({
      where: { id: accountId },
      data: updateData,
    });

    return NextResponse.json({ success: true, account: updated });
  } catch (err: any) {
    console.error('API Error in /api/account/updateLabels:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
