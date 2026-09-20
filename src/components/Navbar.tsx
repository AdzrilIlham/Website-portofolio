import { User, Briefcase, Code2, FolderOpen, FileText, Mail } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";

export default function Navbar() {
  const navItems = [
    { name: 'About', url: '#about', icon: User },
    { name: 'Expertise', url: '#expertise', icon: Briefcase },
    { name: 'Skills', url: '#skills', icon: Code2 },
    { name: 'Projects', url: '#projects', icon: FolderOpen },
    { name: 'Experience', url: '#experience', icon: FileText },
    { name: 'Contact', url: '#contact', icon: Mail }
  ];

  return <NavBar items={navItems} />;
}
