import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Progress } from "@/Components/ui/progress";
import { SidebarDemo } from '@/Components/Sidebar/SidebarDemo';
import { Head } from '@inertiajs/react';
import {
  RiBookOpenLine,
  RiCalendarLine,
  RiTimeLine,
  RiFileList3Line,
  RiMoneyDollarCircleLine,
  RiNotification3Line,
  RiGroupLine,
  RiCheckboxCircleLine,
  RiBarChartLine,
  RiFileUserLine,
  RiGraduationCapLine,
} from 'react-icons/ri';
import { DashboardProps } from '@/types/dashboard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Icons = {
  Book: RiBookOpenLine,
  Calendar: RiCalendarLine,
  Time: RiTimeLine,
  FileList: RiFileList3Line,
  Money: RiMoneyDollarCircleLine,
  Notification: RiNotification3Line,
  Group: RiGroupLine,
  Checkbox: RiCheckboxCircleLine,
  Chart: RiBarChartLine,
  User: RiFileUserLine,
  Graduation: RiGraduationCapLine,
};

export default function Dashboard({
  auth,
  current_enrollment,
  schedule,
  academic_info,
  financial,
  recent_posts,
  student_info
}: DashboardProps) {

  const stats = [
    {
      title: "Current Semester",
      value: academic_info ? `${academic_info.semester} Semester` : 'N/A',
      icon: Icons.Calendar,
      description: academic_info ? academic_info.school_year : 'N/A',
      change: academic_info ? `${academic_info.course} - ${academic_info.year_standing}` : 'N/A',
      changeType: "neutral" as const
    },
    {
      title: "Enrolled Subjects",
      value: current_enrollment?.SubjectsEnrolled?.length.toString() ?? '0',
      icon: Icons.Book,
      description: "Total subjects this semester",
      change: student_info?.status || "Active",
      changeType: "positive" as const
    },
    {
      title: "Next Class",
      value: schedule?.next_class?.subject ?? 'No classes',
      icon: Icons.Time,
      description: schedule?.next_class?.time ?? 'N/A',
      change: schedule?.next_class?.room ?? 'N/A',
      changeType: "neutral" as const
    },
    {
      title: "Balance",
      value: financial?.current_tuition?.balance 
        ? `₱${financial.current_tuition.balance.toLocaleString()}`
        : '₱0',
      icon: Icons.Money,
      description: "Remaining balance",
      change: financial?.current_tuition?.payment_method || 'Not set',
      changeType: financial?.current_tuition?.balance ? 
        (financial.current_tuition.balance > 0 ? "negative" : "positive") 
        : "neutral"
    }
  ];

  const todayClasses = schedule?.today || [];
  const announcements = recent_posts || [];

  return (
    <>
      <div className="relative min-h-screen bg-background">
        <Head title="Dashboard" />
        <SidebarDemo>
          <div className="flex flex-col flex-1 w-full h-full gap-4 p-2 bg-background border md:p-6 lg:p-8 rounded-tl-2xl border-neutral-200 dark:border-neutral-700">
            {/* Header Section */}
            <motion.div 
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Welcome back, {auth.user.name}!
                </h2>
                <p className="text-sm text-muted-foreground">
                  Student ID: {auth.user.person_id} • Course: {student_info?.course?.code || 'N/A'}
                </p>
              </div>
              <Button variant="outline" className="w-full md:w-auto">
                <Icons.User className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div key={stat.title} variants={item} className="w-full">
                    <Card className="h-full">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">
                          {stat.title}
                        </CardTitle>
                        <IconComponent className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold truncate">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                          {stat.description}
                        </p>
                        <div className={`text-xs mt-2 ${
                          stat.changeType === 'positive' ? 'text-green-500' :
                          stat.changeType === 'negative' ? 'text-red-500' :
                          'text-gray-500'
                        }`}>
                          {stat.change}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Main Content Grid */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-4 md:grid-cols-12 mt-4"
            >
              {/* Schedule Section */}
              <motion.div variants={item} className="md:col-span-7">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Today's Schedule</CardTitle>
                        <CardDescription>Your classes for today</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="hidden md:flex">
                        <Icons.Calendar className="w-4 h-4 mr-2" />
                        View Full Schedule
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todayClasses.length > 0 ? (
                        todayClasses.map((class_, index) => (
                          <div key={index} className="flex items-center p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                            <div className="flex-1">
                              <p className="font-medium">{class_.subject}</p>
                              <p className="text-sm text-muted-foreground">
                                {class_.time} • Room {class_.room}
                              </p>
                            </div>
                            <Icons.Checkbox className={`w-5 h-5 ${
                              class_.status === 'completed' ? 'text-green-500' : 'text-gray-300'
                            }`} />
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Icons.Calendar className="w-12 h-12 mx-auto text-muted-foreground/50" />
                          <p className="mt-2 text-sm text-muted-foreground">No classes scheduled for today</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Announcements Section */}
              <motion.div variants={item} className="md:col-span-5">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Announcements</CardTitle>
                        <CardDescription>Latest updates from your classes</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Icons.Notification className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {announcements.length > 0 ? (
                        announcements.map((post, index) => (
                          <div
                            key={index}
                            className="group p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium group-hover:text-primary transition-colors">{post.title}</p>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {post.content}
                                </p>
                                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                  <span>{post.user.name} • {post.class.name}</span>
                                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Icons.Notification className="w-12 h-12 mx-auto text-muted-foreground/50" />
                          <p className="mt-2 text-sm text-muted-foreground">No announcements available</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-4"
            >
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Frequently used student services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Button variant="outline" className="w-full">
                        <Icons.FileList className="w-4 h-4 mr-2" />
                        View Grades
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Icons.Calendar className="w-4 h-4 mr-2" />
                        Class Schedule
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Icons.Money className="w-4 h-4 mr-2" />
                        Payment History
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Icons.Graduation className="w-4 h-4 mr-2" />
                        Curriculum
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </SidebarDemo>
      </div>
    </>
  );
}
