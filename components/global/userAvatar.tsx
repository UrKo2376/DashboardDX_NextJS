'use client';

import { useEffect, useState } from "react";

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
  const [imageSrc, setImageSrc] = useState("/images/user_images/user.png");

  useEffect(() => {
    const fileName = `user_${accountId}_${userId}.jpg`;
    const imagePath = `/images/user_images/${fileName}`;
    fetch(imagePath, { method: "HEAD" }).then((res) => {
      if (res.ok) {
        setImageSrc(imagePath);
      }
    });
  }, [accountId, userId]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`rounded-xl object-cover border border-gray-300 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
