import React, { useEffect, useState } from 'react';
import generateAvatar from '../utils/generateAvatar';
import { IAvatarProps } from '../globals';

const Avatar: React.FC<IAvatarProps> = ({ name, width = 288, height = 200 }) => {
  const [avatarSrc, setAvatarSrc] = useState<string>('');

  useEffect(() => {
    setAvatarSrc(generateAvatar(name, width, height));
  }, [name, width, height]);

  return <img src={avatarSrc} alt={name} width={width} height={height} />;
};

export default Avatar;
