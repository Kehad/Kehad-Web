type TechItem = {
  name: string;
  icon: string; // The slug for Simple Icons
  color?: string; // Optional hex color
};

const myStack: TechItem[] = [
  { name: "Next.js", icon: "nextdotjs", color: "white" },
  { name: "TypeScript", icon: "typescript", color: "3178C6" },
  { name: "React", icon: "react", color: "61DAFB" },
  { name: "Node.js", icon: "nodedotjs", color: "339933" },
  { name: "PostgreSQL", icon: "postgresql", color: "4169E1" },
  { name: "MongoDB", icon: "mongodb", color: "47A248" },
  { name: "Docker", icon: "docker", color: "2496ED" },
  { name: "Google Cloud", icon: "googlecloud", color: "4285F4" },
];

type ExperienceItem = {
  role: string;
  company: string;
  duration: string;
  description: string[];
  skills: TechItem[]; // Using the TechItem type from our previous step
  accentColor?: string; // e.g., 'orange-600' or 'blue-500'
};
export const TechBadge = ({ name, icon, color }: TechItem) => {
  const iconUrl = `https://cdn.simpleicons.org/${icon}/${color || 'white'}`;
  
  return (
    <span className="flex items-center gap-2 bg-[#121620] hover:bg-[#1a202e] transition border border-gray-800 px-3 py-2 rounded-lg text-xs md:text-sm font-bold text-gray-200 cursor-default shadow-sm group">
      <img 
        src={iconUrl} 
        alt={name} 
        className="w-4 h-4 pointer-events-none transition-transform group-hover:scale-110" 
      /> 
      {name}
    </span>
  );
};


export const ExperienceCard = ({ 
  role, 
  company, 
  duration, 
  description, 
  skills, 
  accentColor = "orange-600" 
}: ExperienceItem) => {
  return (
    <div className="bg-[#0c101a] border border-gray-800 rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-gray-700 transition duration-300 shadow-2xl">
      {/* Dynamic Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-tr from-${accentColor}/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none`}></div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 relative z-10">
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          {role}
        </h3>
        <span className="bg-[#151a24] border border-gray-800 text-gray-300 font-semibold text-sm px-4 py-1.5 rounded-full mt-3 md:mt-0 w-fit whitespace-nowrap shadow-sm">
          {duration}
        </span>
      </div>

      <p className="text-gray-400 font-bold text-lg mb-8 tracking-wide relative z-10">
        {company}
      </p>
      
      {/* Achievements List */}
      <ul className="space-y-4 mb-10 text-base md:text-lg relative z-10">
        {description.map((point, index) => (
          <li key={index} className="flex items-start text-gray-300 font-medium leading-relaxed">
            <span className="mr-3 text-white mt-0.5 font-bold">•</span>
            {point}
          </li>
        ))}
      </ul>

      {/* Tech Stack Footer */}
      <div className="flex flex-wrap gap-3 relative z-10">
        {skills.map((skill) => (
          <TechBadge key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  );
};