import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { GradesProps } from '@/types/grades';
import { motion } from 'framer-motion';
import { SidebarDemo } from '@/Components/Sidebar/SidebarDemo';
import {
  RiBookLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiTimeLine,
  RiBarChartBoxLine,
  RiFileList3Line,
  RiMedalLine,
  RiListCheck,
  RiCheckLine,
} from 'react-icons/ri';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

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

export default function Grades({ auth, grades, academic_info }: GradesProps) {
  const [selectedYear, setSelectedYear] = useState<string>("1");
  const [selectedSemester, setSelectedSemester] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter grades by selected year and semester
  const filteredGrades = grades.filter(
    (grade) =>
      grade.subject.academic_year === parseInt(selectedYear) &&
      grade.subject.semester === parseInt(selectedSemester) &&
      (grade.status === 'Completed' || grade.status === 'Ongoing') &&
      (searchQuery === "" ||
        grade.subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grade.subject.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter not taken subjects
  const notTakenGrades = grades.filter(
    (grade) =>
      grade.status === 'Not taken' &&
      (searchQuery === "" ||
        grade.subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grade.subject.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculate statistics
  const completedSubjects = grades.filter((grade) => grade.status === 'Completed');
  const ongoingSubjects = grades.filter((grade) => grade.status === 'Ongoing');
  const notTakenSubjects = grades.filter((grade) => grade.status === 'Not taken');

  // Calculate GPA (assuming grades are on a 100-point scale)
  const completedGrades = completedSubjects.filter(grade => grade.grade !== null);
  const averageGrade = completedGrades.length > 0
    ? completedGrades.reduce((sum, grade) => sum + (grade.grade || 0), 0) / completedGrades.length
    : 0;

  // Calculate progress percentage
  const totalSubjects = grades.length;
  const progressPercentage = (completedSubjects.length / totalSubjects) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <RiCheckboxCircleLine className="w-5 h-5 text-green-500" />;
      case 'Ongoing':
        return <RiTimeLine className="w-5 h-5 text-blue-500" />;
      case 'Not taken':
        return <RiCloseCircleLine className="w-5 h-5 text-gray-400" />;
    }
  };

  const getGradeColor = (grade: number | null) => {
    if (!grade) return 'text-gray-500';
    if (grade >= 90) return 'text-green-500';
    if (grade >= 75) return 'text-blue-500';
    return 'text-red-500';
  };

  return (
    <>
      <Head title="Grades" />
      <div className="min-h-screen bg-background">
        <SidebarDemo>
          <div className="flex flex-col flex-1 w-full h-full gap-4 p-2 bg-white border md:p-10 rounded-tl-2xl border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900">
            <motion.div className="flex items-center justify-between">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-semibold leading-tight text-foreground"
              >
                Academic Performance
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-muted-foreground"
              >
                Student ID: {auth.user.id}
              </motion.p>
            </motion.div>

            {/* Progress Overview */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-4 md:grid-cols-4"
            >
              <motion.div variants={item} className="col-span-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Progress</CardTitle>
                    <CardDescription>
                      Overall completion of your degree program
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {completedSubjects.length} of {totalSubjects} subjects completed
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {progressPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                    <div className="grid gap-4 pt-4 md:grid-cols-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold">{averageGrade.toFixed(2)}</div>
                          <p className="text-xs text-muted-foreground">Average Grade</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-green-500">{completedSubjects.length}</div>
                          <p className="text-xs text-muted-foreground">Completed</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-blue-500">{ongoingSubjects.length}</div>
                          <p className="text-xs text-muted-foreground">Ongoing</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-gray-500">{notTakenSubjects.length}</div>
                          <p className="text-xs text-muted-foreground">Not Taken</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="grades" className="space-y-4">
              <TabsList>
                <TabsTrigger value="grades">
                  Grades & Ongoing Subjects
                  {ongoingSubjects.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {ongoingSubjects.length} Ongoing
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="not-taken">
                  Subjects Not Taken
                  <Badge variant="secondary" className="ml-2">
                    {notTakenSubjects.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="grades" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">Grades & Ongoing Subjects</CardTitle>
                    <div className="flex items-center gap-4">
                      <div className="relative w-[300px]">
                        <Input
                          type="text"
                          placeholder="Search subjects..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4].map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                              {year === 1
                                ? 'st'
                                : year === 2
                                ? 'nd'
                                : year === 3
                                ? 'rd'
                                : 'th'}{' '}
                              Year
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2].map((sem) => (
                            <SelectItem key={sem} value={sem.toString()}>
                              {sem}
                              {sem === 1 ? 'st' : 'nd'} Semester
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="h-12 px-4 text-left align-middle font-medium">Code</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Title</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Units</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Grade</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Instructor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredGrades.map((grade) => (
                            <tr key={grade.id} className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-4 align-middle">{grade.subject.code}</td>
                              <td className="p-4 align-middle">{grade.subject.title}</td>
                              <td className="p-4 align-middle">{grade.subject.units}</td>
                              <td className={`p-4 align-middle font-medium ${getGradeColor(grade.grade)}`}>
                                {grade.grade ?? 'Ongoing'}
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(grade.status)}
                                  {grade.status}
                                </div>
                              </td>
                              <td className="p-4 align-middle text-muted-foreground">
                                {grade.instructor || 'Not assigned'}
                              </td>
                            </tr>
                          ))}
                          {filteredGrades.length === 0 && searchQuery && (
                            <tr>
                              <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                No subjects found matching "{searchQuery}"
                              </td>
                            </tr>
                          )}
                          {filteredGrades.length === 0 && !searchQuery && (
                            <tr>
                              <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                No subjects for selected year and semester
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="not-taken" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <RiListCheck className="w-5 h-5" />
                      Subjects to Take
                    </CardTitle>
                    <CardDescription>
                      Subjects you need to complete for your program
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="grid gap-6">
                        {[1, 2, 3, 4].map((year) => {
                          const yearSubjects = grades.filter(
                            (grade) => grade.subject.academic_year === year
                          );
                          const notTakenSubjects = yearSubjects.filter(
                            (grade) => grade.status === 'Not taken'
                          );
                          const isYearCompleted = notTakenSubjects.length === 0 && yearSubjects.length > 0;
                          const hasSubjects = yearSubjects.length > 0;

                          return (
                            <motion.div
                              key={year}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-4"
                            >
                              <div className="sticky top-0 z-10 flex items-center justify-between p-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                                <div className="flex items-center gap-3">
                                  <h3 className="text-lg font-semibold">Year {year}</h3>
                                  {isYearCompleted && (
                                    <div className="flex items-center gap-1 px-2 py-1 text-sm text-green-500 rounded-full bg-green-50">
                                      <RiCheckLine className="w-4 h-4" />
                                      <span>Completed</span>
                                    </div>
                                  )}
                                  {!hasSubjects && (
                                    <div className="flex items-center gap-1 px-2 py-1 text-sm text-gray-500 rounded-full bg-gray-50">
                                      <RiTimeLine className="w-4 h-4" />
                                      <span>Not Started</span>
                                    </div>
                                  )}
                                </div>
                                {hasSubjects && !isYearCompleted && (
                                  <div className="flex gap-2">
                                    {[1, 2].map((semester) => {
                                      const semesterSubjects = grades.filter(
                                        (grade) =>
                                          grade.status === 'Not taken' &&
                                          grade.subject.academic_year === year &&
                                          grade.subject.semester === semester
                                      );
                                      return semesterSubjects.length > 0 ? (
                                        <Badge
                                          key={semester}
                                          variant={semester === 1 ? "default" : "secondary"}
                                        >
                                          {semester === 1 ? '1st' : '2nd'} Sem: {semesterSubjects.length}
                                        </Badge>
                                      ) : null;
                                    })}
                                  </div>
                                )}
                              </div>

                              {!isYearCompleted && hasSubjects && (
                                <div className="grid gap-6 md:grid-cols-2">
                                  {[1, 2].map((semester) => {
                                    const semesterSubjects = grades.filter(
                                      (grade) =>
                                        grade.status === 'Not taken' &&
                                        grade.subject.academic_year === year &&
                                        grade.subject.semester === semester
                                    );
                                    return semesterSubjects.length > 0 ? (
                                      <Card key={semester}>
                                        <CardHeader className="pb-2">
                                          <CardTitle className="text-base">
                                            {semester === 1 ? 'First' : 'Second'} Semester
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="grid gap-2">
                                            {semesterSubjects.map((grade) => (
                                              <motion.div
                                                key={grade.id}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 0.2 }}
                                              >
                                                <HoverCard>
                                                  <HoverCardTrigger asChild>
                                                    <div className="flex items-center justify-between p-3 transition-colors border rounded-lg cursor-pointer hover:bg-muted/50 group">
                                                      <div className="flex items-center gap-3">
                                                        <div className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-primary/10 group-hover:bg-primary/20">
                                                          <RiBookLine className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                          <p className="font-medium group-hover:text-primary">
                                                            {grade.subject.code}
                                                          </p>
                                                          <p className="text-sm text-muted-foreground line-clamp-1">
                                                            {grade.subject.title}
                                                          </p>
                                                        </div>
                                                      </div>
                                                      <div className="flex items-center gap-2">
                                                        <Badge variant="outline">
                                                          {grade.subject.units} {grade.subject.units === 1 ? 'unit' : 'units'}
                                                        </Badge>
                                                      </div>
                                                    </div>
                                                  </HoverCardTrigger>
                                                  <HoverCardContent side="right" className="w-80">
                                                    <div className="space-y-2">
                                                      <h4 className="text-sm font-semibold">{grade.subject.title}</h4>
                                                      <div className="text-xs">
                                                        <span className="text-muted-foreground">Code: </span>
                                                        <span className="font-medium">{grade.subject.code}</span>
                                                      </div>
                                                      <div className="text-xs">
                                                        <span className="text-muted-foreground">Units: </span>
                                                        <span className="font-medium">{grade.subject.units}</span>
                                                      </div>
                                                      {grade.subject.pre_requisites?.length > 0 ? (
                                                        <>
                                                          <p className="text-xs text-muted-foreground">Prerequisites:</p>
                                                          <div className="flex flex-wrap gap-1">
                                                            {grade.subject.pre_requisites.map((preReq: string, index: number) => (
                                                              <Badge key={index} variant="secondary">
                                                                {preReq}
                                                              </Badge>
                                                            ))}
                                                          </div>
                                                        </>
                                                      ) : (
                                                        <p className="text-xs text-muted-foreground">No prerequisites required</p>
                                                      )}
                                                    </div>
                                                  </HoverCardContent>
                                                </HoverCard>
                                              </motion.div>
                                            ))}
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ) : null;
                                  })}
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarDemo>
      </div>
    </>
  );
}
