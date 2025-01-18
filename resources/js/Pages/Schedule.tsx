import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Head } from '@inertiajs/react';
import { SidebarDemo } from '@/Components/Sidebar/SidebarDemo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  RiBookOpenLine,
  RiCalendarLine,
  RiTimeLine,
  RiMapPinLine,
  RiCalendarTodoLine,
  RiDownload2Line,
  RiInformationLine,
  RiTimer2Line,
} from 'react-icons/ri';
import { PageProps } from '@/types';

interface ScheduleItem {
  id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  room: {
    name: string;
  };
  class: {
    Subject: {
      title: string;
    };
  };
}

interface Props extends PageProps {
  schedules: {
    [key: string]: ScheduleItem[];
  };
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Subject colors for timeline
const subjectColors = [
  { bg: "bg-blue-100 dark:bg-blue-900/30", border: "border-blue-200 dark:border-blue-800", text: "text-blue-900 dark:text-blue-100" },
  { bg: "bg-purple-100 dark:bg-purple-900/30", border: "border-purple-200 dark:border-purple-800", text: "text-purple-900 dark:text-purple-100" },
  { bg: "bg-green-100 dark:bg-green-900/30", border: "border-green-200 dark:border-green-800", text: "text-green-900 dark:text-green-100" },
  { bg: "bg-orange-100 dark:bg-orange-900/30", border: "border-orange-200 dark:border-orange-800", text: "text-orange-900 dark:text-orange-100" },
  { bg: "bg-pink-100 dark:bg-pink-900/30", border: "border-pink-200 dark:border-pink-800", text: "text-pink-900 dark:text-pink-100" },
  { bg: "bg-teal-100 dark:bg-teal-900/30", border: "border-teal-200 dark:border-teal-800", text: "text-teal-900 dark:text-teal-100" },
];

// Time slots for timeline (30-minute intervals from 7 AM to 9 PM)
const timeSlots = Array.from({ length: 28 }, (_, i) => {
  const hour = Math.floor(i / 2) + 7;
  const minutes = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minutes}`;
});

export default function Schedule({ auth, schedules }: Props) {
  const [selectedDay, setSelectedDay] = useState<string>(
    new Date().toLocaleDateString('en-US', { weekday: 'long' })
  );
  const [view, setView] = useState<'list' | 'timeline'>('timeline');

  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getClassDuration = (start: string, end: string) => {
    const startTime = new Date(`2024-01-01T${start}`);
    const endTime = new Date(`2024-01-01T${end}`);
    return Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
  };

  const getTimelinePosition = (time: string) => {
    const [hours, minutes] = time.split(':');
    const totalMinutes = (parseInt(hours) - 7) * 60 + parseInt(minutes);
    return (totalMinutes / (14 * 60)) * 100;
  };

  const getTimelineHeight = (start: string, end: string) => {
    const duration = getClassDuration(start, end);
    return (duration / (14 * 60)) * 100;
  };

  const getSubjectColor = (subjectTitle: string) => {
    const hash = subjectTitle.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return subjectColors[hash % subjectColors.length];
  };

  const getTotalHours = (classes: ScheduleItem[] = []) => {
    return classes.reduce((total, cls) => {
      return total + getClassDuration(cls.start_time, cls.end_time);
    }, 0) / 60;
  };

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
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <>
      <Head title="Class Schedule" />
      <div className="min-h-screen bg-background">
        <SidebarDemo>
          <div className="flex flex-col flex-1 w-full h-full gap-6 p-4 bg-white border md:p-8 rounded-tl-2xl border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Weekly Schedule</h1>
                <Button variant="outline" size="sm">
                  <RiDownload2Line className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                View and manage your class schedule for the current semester
              </p>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Left Sidebar */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RiCalendarLine className="w-5 h-5" />
                    Quick View
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Today's Classes</h3>
                    <div className="p-3 text-sm rounded-lg bg-muted">
                      <div className="flex items-center justify-between">
                        <span>Total Classes</span>
                        <span className="font-medium">
                          {schedules[selectedDay]?.length || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span>Total Hours</span>
                        <span className="font-medium">
                          {getTotalHours(schedules[selectedDay]).toFixed(1)}h
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="mb-3 font-medium">Jump to Day</h3>
                    <div className="space-y-1">
                      {daysOfWeek.map((day) => (
                        <Button
                          key={day}
                          variant={selectedDay === day ? "secondary" : "ghost"}
                          className="justify-start w-full"
                          onClick={() => setSelectedDay(day)}
                        >
                          <RiCalendarTodoLine className="w-4 h-4 mr-2" />
                          {day}
                          {schedules[day]?.length > 0 && (
                            <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {schedules[day].length}
                            </span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Schedule View */}
              <Card className="lg:col-span-9">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <RiBookOpenLine className="w-5 h-5" />
                      {selectedDay}'s Classes
                    </CardTitle>
                    <Tabs defaultValue={view} className="w-[200px]" onValueChange={(v) => setView(v as 'list' | 'timeline')}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                        <TabsTrigger value="list">List</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <CardDescription>
                    {schedules[selectedDay]?.length
                      ? `${schedules[selectedDay].length} classes scheduled`
                      : 'No classes scheduled'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <AnimatePresence mode="wait">
                      {view === 'timeline' ? (
                        <motion.div
                          key="timeline"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="relative bg-white border rounded-lg dark:bg-neutral-900"
                        >
                          {/* Time markers */}
                          <div className="absolute top-0 left-0 w-20 h-full border-r bg-muted/5">
                            {timeSlots.map((time, index) => (
                              <div
                                key={time}
                                className={cn(
                                  "absolute left-0 w-full border-t",
                                  index % 2 === 0 ? "border-neutral-200" : "border-neutral-100"
                                )}
                                style={{ top: `${(index / timeSlots.length) * 100}%` }}
                              >
                                {index % 2 === 0 && (
                                  <span className="absolute text-xs font-medium -top-3 left-2 text-muted-foreground">
                                    {formatTime(time + ':00')}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Classes on timeline */}
                          <div className="relative ml-20 h-[840px]">
                            {schedules[selectedDay]?.map((schedule) => {
                              const top = getTimelinePosition(schedule.start_time);
                              const height = getTimelineHeight(schedule.start_time, schedule.end_time);
                              const colors = getSubjectColor(schedule.class.Subject.title);

                              return (
                                <motion.div
                                  key={schedule.id}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className={cn(
                                    "absolute left-0 right-4 p-3 mx-2 rounded-lg border",
                                    "transition-all duration-200 hover:shadow-lg",
                                    colors.bg,
                                    colors.border
                                  )}
                                  style={{
                                    top: `${top}%`,
                                    height: `${height}%`,
                                  }}
                                >
                                  <div className="flex flex-col h-full">
                                    <h4 className={cn("font-medium truncate", colors.text)}>
                                      {schedule.class.Subject.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                      <RiMapPinLine className="flex-shrink-0 w-3 h-3" />
                                      <span className="truncate">Room {schedule.room.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <RiTimeLine className="flex-shrink-0 w-3 h-3" />
                                      <span className="truncate">
                                        {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="list"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-4"
                        >
                          {schedules[selectedDay]?.map((schedule) => {
                            const colors = getSubjectColor(schedule.class.Subject.title);

                            return (
                              <motion.div
                                key={schedule.id}
                                variants={itemVariants}
                                className={cn(
                                  "p-4 rounded-lg border transition-all",
                                  "hover:shadow-lg hover:scale-[1.02]",
                                  colors.bg,
                                  colors.border
                                )}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="space-y-3">
                                    <div>
                                      <h3 className={cn("text-lg font-semibold", colors.text)}>
                                        {schedule.class.Subject.title}
                                      </h3>
                                      <div className="flex flex-wrap items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                          <RiTimer2Line className="w-4 h-4" />
                                          {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                          <RiMapPinLine className="w-4 h-4" />
                                          Room {schedule.room.name}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="px-2.5 py-1 text-xs font-medium rounded-full bg-background/50">
                                        {getClassDuration(schedule.start_time, schedule.end_time)} minutes
                                      </div>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="transition-transform hover:scale-110"
                                  >
                                    <RiInformationLine className="w-4 h-4" />
                                  </Button>
                                </div>
                              </motion.div>
                            );
                          })}
                          {!schedules[selectedDay]?.length && (
                            <motion.div
                              variants={itemVariants}
                              className="flex flex-col items-center justify-center py-12 text-center"
                            >
                              <RiCalendarLine className="w-12 h-12 text-muted-foreground/50" />
                              <h3 className="mt-4 text-lg font-medium">No Classes Today</h3>
                              <p className="mt-2 text-sm text-muted-foreground">
                                You have no classes scheduled for {selectedDay}
                              </p>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarDemo>
      </div>
    </>
  );
}
