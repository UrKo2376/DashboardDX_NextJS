import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get('accountId');
  const userId = searchParams.get('userId');

  if (!accountId || !userId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const fileName = `user_${accountId}_${userId}.jpg`;
  const imagePath = path.join(process.cwd(), 'public', 'images', 'user_images', fileName);

  try {
    if (fs.existsSync(imagePath)) {
      return NextResponse.json({ imageUrl: `/images/user_images/${fileName}` });
    } else {
      return NextResponse.json({ imageUrl: `/images/user_images/user.png` });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
