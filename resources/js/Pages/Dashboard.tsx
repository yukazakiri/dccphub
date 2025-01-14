import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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

// Define icons object to avoid re-renders
const Icons = {
  Book: RiBookOpenLine,
  Calendar: RiCalendarLine,
  Time: RiTimeLine,
  FileList: RiFileList3Line,
  Money: RiMoneyDollarCircleLine,
  Notification: RiNotification3Line,
  Group: RiGroupLine,
  Checkbox: RiCheckboxCircleLine,
};

export default function Dashboard({
  auth,
  current_enrollment,
  schedule,
  academic_info,
  financial,
  recent_posts
}: DashboardProps) {

  // Add this to debug in browser
  console.log({ auth, current_enrollment, schedule, academic_info, financial, recent_posts });

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
      change: "Active",
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

  // Update today's classes to use the new schedule structure
  const todayClasses = schedule?.today || [];

  return (
      <>
      <div className="relative h-screen bg-background">
      <Head title="Dashboard" />
        <SidebarDemo>
          <div className="flex flex-col flex-1 w-full h-full gap-4 p-2 bg-white border md:p-10 rounded-tl-2xl border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900">
            <motion.div className="flex items-center justify-between">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-semibold leading-tight text-foreground"
              >
                Welcome back, {auth.user.name}!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-muted-foreground"
              >
                Student ID: {auth.user.person_id}
              </motion.p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div key={stat.title} variants={item}>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">
                          {stat.title}
                        </CardTitle>
                        <IconComponent className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
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

            {/* Schedule and Progress Section */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7"
            >
              {/* Today's Schedule */}
              <motion.div variants={item} className="lg:col-span-4">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>
                      Your classes for today
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todayClasses.length > 0 ? (
                        todayClasses.map((class_, index) => (
                          <div key={index} className="flex items-center p-3 border rounded-lg">
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
                        <p className="text-sm text-muted-foreground">No classes scheduled for today</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Notifications */}
              <motion.div variants={item} className="lg:col-span-3">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Recent Announcements</CardTitle>
                    <CardDescription>
                      Latest updates from your classes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recent_posts?.length > 0 ? (
                        recent_posts.map((post, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-3 border rounded-lg"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{post.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {post.content}
                              </p>
                              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                                <span>{post.user.name} • {post.class.name}</span>
                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No announcements available</p>
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
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Icons.FileList className="w-4 h-4 mr-2" />
                        View Grades
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icons.Calendar className="w-4 h-4 mr-2" />
                        Class Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icons.Money className="w-4 h-4 mr-2" />
                        Payment History
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icons.Group className="w-4 h-4 mr-2" />
                        Class Directory
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
