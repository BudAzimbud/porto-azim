interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    stacks: string[];
    image: string;
    link?: string;
    type: 'web' | 'mobile';
  };
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <div 
      className={`
        project-card 
        relative 
        flex flex-col 
        ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} 
        gap-4 sm:gap-8 
        items-center 
        bg-white dark:bg-gray-800
        rounded-lg 
        p-4 sm:p-6 
        hover:shadow-xl 
        transition-all
        duration-300
        dark:hover:bg-gray-750
        dark:hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]
        dark:after:hover:opacity-100
        after:absolute
        after:inset-0
        after:opacity-0
        after:transition-opacity
        after:duration-300
        after:rounded-lg
        after:bg-gradient-radial
        after:from-blue-500/10
        after:to-transparent
        after:-z-10
      `}
    >
      <div className="flex-1 space-y-3 sm:space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
          {project.link ? (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              {project.title} ↗
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.stacks.map((tech, i) => (
            <span 
              key={i} 
              className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-xs sm:text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full lg:w-auto">
        {project.type === 'web' ? (
          <div className="relative w-full aspect-[16/10] bg-gray-900 dark:bg-gray-950 rounded-lg p-2">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 sm:h-1.5 bg-gray-800 dark:bg-gray-700 rounded-b-lg"></div>
            <div className="w-full h-full overflow-hidden rounded-md">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="relative w-48 sm:w-64 mx-auto aspect-[9/19] bg-gray-900 dark:bg-gray-950 rounded-3xl p-2">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 bg-gray-800 dark:bg-gray-700 rounded-lg"></div>
            <div className="w-full h-full overflow-hidden rounded-2xl">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 