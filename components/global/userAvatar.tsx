'use client';

import { useEffect, useState } from 'react';

interface UserAvatarProps {
  accountId: number;
  userId: number;
  size?: number;
  className?: string;
  alt?: string;
}

export default function UserAvatar({
  accountId,
  userId,
  size = 64,
  className = '',
  alt = 'User avatar',
}: UserAvatarProps) {
  const [imageSrc, setImageSrc] = useState('/images/user_images/user.png');

  useEffect(() => {
    async function checkImage() {
      try {
        const res = await fetch(`/api/getAvatar/?accountId=${accountId}&userId=${userId}`);
        if (res.ok) {
          const data = await res.json();
          setImageSrc(data.imageUrl);
        }
      } catch (err) {
        // fallback image is already set by default
      }
    }

    checkImage();
  }, [accountId, userId]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      style={{ width: size, height: size, objectFit: 'cover' }}
      className={`rounded-xl border border-gray-300 ${className}`}
    />
  );
}
