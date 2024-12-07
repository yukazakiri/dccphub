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

export default function Dashboard({ auth, enrollments, schedule, tuition }) {
  const stats = [
    {
      title: "Current Semester",
      value: `${enrollments?.semester || '1st'} Semester`,
      icon: Icons.Calendar,
      description: enrollments?.school_year || '2023-2024',
      change: "Current",
      changeType: "neutral"
    },
    {
      title: "Enrolled Subjects",
      value: enrollments?.SubjectsEnrolled?.length || '0',
      icon: Icons.Book,
      description: "Total subjects this semester",
      change: "Active",
      changeType: "positive"
    },
    {
      title: "Next Class",
      value: schedule?.next_class?.subject || 'No classes',
      icon: Icons.Time,
      description: schedule?.next_class?.time || 'N/A',
      change: schedule?.next_class?.room || 'N/A',
      changeType: "neutral"
    },
    {
      title: "Balance",
      value: `₱${tuition?.totalbalance || '0'}`,
      icon: Icons.Money,
      description: "Remaining balance",
      change: tuition?.payment_method || 'Not set',
      changeType: tuition?.totalbalance > 0 ? "negative" : "positive"
    }
  ];

  return (
    <>
      <Head title="Dashboard" />
      <div className="min-h-screen bg-background">
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
                      {schedule?.today_classes?.length > 0 ? (
                        schedule.today_classes.map((class_, index) => (
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
                    <CardTitle>Recent Notifications</CardTitle>
                    <CardDescription>
                      Important updates and announcements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Replace with actual notifications */}
                      {[
                        {
                          title: 'Tuition Payment Due',
                          message: 'Your next payment is due next week',
                          time: '2h ago',
                          type: 'warning'
                        },
                        {
                          title: 'New Course Material',
                          message: 'New materials uploaded for Mathematics',
                          time: '5h ago',
                          type: 'info'
                        },
                        {
                          title: 'Grade Posted',
                          message: 'New grades posted for Programming 101',
                          time: '1d ago',
                          type: 'success'
                        }
                      ].map((notification, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-3 border rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      ))}
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
