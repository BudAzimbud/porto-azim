const badgeColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-red-500',
];

export const getRandomColor = () => {
  return badgeColors[Math.floor(Math.random() * badgeColors.length)];
}; 