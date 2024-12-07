import { Head } from '@inertiajs/react';
import { SidebarDemo } from '@/Components/Sidebar/SidebarDemo';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { motion } from 'framer-motion';
import { RiBookOpenLine, RiCalendarLine, RiGraduationCapLine } from 'react-icons/ri';

interface User {
    name: string;
    email: string;
}

interface CourseProps {
    auth: {
        user: User;
    };
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
};

export default function Courses({ auth }: CourseProps) {
    const features = [
        {
            title: "Course Registration",
            description: "Easy enrollment in your chosen subjects with real-time availability updates",
            icon: RiBookOpenLine,
            comingSoon: "Available for next semester registration"
        },
        {
            title: "Schedule Planning",
            description: "Interactive timetable builder to organize your class schedule efficiently",
            icon: RiCalendarLine,
            comingSoon: "Coming this month"
        },
        {
            title: "Academic Progress",
            description: "Track your grades, credits, and academic achievements in one place",
            icon: RiGraduationCapLine,
            comingSoon: "Launching next week"
        }
    ];

    return (
        <>
            <Head title="Courses" />
            <div className="min-h-screen bg-background dark:bg-neutral-900">
                <SidebarDemo>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="flex flex-col flex-1 w-full h-full gap-4 p-2 bg-white border md:p-10 rounded-tl-2xl border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900/30 dark:backdrop-blur-sm"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {/* Main Content Card */}
                            <Card className="overflow-hidden border col-span-full dark:border-neutral-800 dark:bg-neutral-900/50">
                                <CardContent className="p-8">
                                    <motion.div
                                        className="flex flex-col items-center justify-center min-h-[300px] text-center"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <motion.div
                                            initial={{ y: -20 }}
                                            animate={{ y: 0 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 20
                                            }}
                                        >
                                            <h3 className="mb-6 text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-primary/60 dark:from-primary/80 dark:to-primary/40 bg-clip-text">
                                                Your Course Hub is Almost Ready!
                                            </h3>
                                        </motion.div>
                                        <motion.p
                                            className="max-w-2xl mb-8 text-lg text-gray-600 dark:text-gray-300"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            We're putting the finishing touches on your new course management experience.
                                            Soon you'll be able to manage your academic journey with just a few clicks!
                                        </motion.p>
                                        <motion.div
                                            className="inline-flex items-center px-4 py-2 text-sm text-white rounded-full shadow-lg bg-primary dark:bg-primary/80 dark:hover:bg-primary dark:shadow-primary/20"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            🎓 Launching Soon
                                        </motion.div>
                                    </motion.div>
                                </CardContent>
                            </Card>

                            {/* Feature Cards */}
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    className="sm:col-span-1"
                                >
                                    <Card className="h-full overflow-hidden border dark:border-neutral-800 dark:bg-neutral-900/50 backdrop-blur-sm">
                                        <CardContent className="p-6">
                                            <div className="flex items-center mb-4">
                                                <feature.icon className="w-6 h-6 mr-2 text-primary dark:text-primary/80" />
                                                <h3 className="text-lg font-semibold dark:text-white">{feature.title}</h3>
                                            </div>
                                            <p className="mb-4 text-gray-600 dark:text-gray-300">{feature.description}</p>
                                            <div className="inline-flex items-center px-3 py-1 text-sm rounded-full text-primary dark:text-primary/80 bg-primary/10 dark:bg-primary/20">
                                                {feature.comingSoon}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </SidebarDemo>
            </div>
        </>
    );
}
