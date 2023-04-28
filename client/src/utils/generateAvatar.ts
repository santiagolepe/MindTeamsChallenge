const generateAvatar = (name: string, width: number, height: number): string => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Failed to create 2D context');
  }

  canvas.width = width;
  canvas.height = height;

  const bootstrapColors = [
    '#0d6efd', // Primary
    '#6c757d', // Secondary
    '#198754', // Success
    '#dc3545', // Danger
    '#ffc107', // Warning
    '#0dcaf0', // Info
    '#6610f2', // Indigo
    '#6f42c1', // Purple
  ];

  const colorIndex = Math.floor(Math.random() * bootstrapColors.length);
  context.fillStyle = bootstrapColors[colorIndex];
  context.fillRect(0, 0, width, height);

  let initials = name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  // add second char
  if (initials.length === 1 && name.length > 1) {
    initials += name[1].toUpperCase()
  }

  context.font = 'bold 60px Arial';
  context.fillStyle = '#FFFFFF';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(initials, width / 2, height / 2);

  return canvas.toDataURL('image/png');
};

export default generateAvatar;
