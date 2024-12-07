import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import LogoutOtherBrowserSessions from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm';
import TwoFactorAuthenticationForm from '@/Pages/Profile/Partials/TwoFactorAuthenticationForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';
import { SidebarDemo } from '@/Components/Sidebar/SidebarDemo';
import { Session } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  RiUserLine,
  RiBookLine,
  RiGraduationCapLine,
  RiCalendarLine,
  RiMailLine,
  RiPhoneLine,
  RiSettings4Line,
  RiFileList3Line,
  RiDashboardLine,
  RiShieldLine,
} from "react-icons/ri";

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

interface Props {
  sessions: Session[];
  confirmsTwoFactorAuthentication: boolean;
  student: any;
  currentSemester: string;
}

export default function Show({
  sessions,
  confirmsTwoFactorAuthentication,
  student,
  currentSemester,
}: Props) {
  const page = useTypedPage();
  const [activeSection, setActiveSection] = React.useState('overview');

  const menuItems = [
    { id: 'overview', icon: RiDashboardLine, label: 'Overview' },
    { id: 'personal', icon: RiUserLine, label: 'Personal Info' },
    { id: 'academic', icon: RiGraduationCapLine, label: 'Academic Info' },
    { id: 'security', icon: RiShieldLine, label: 'Security' },
  ];

  const calculateProfileCompletion = () => {
    const fields = [
      student?.first_name,
      student?.last_name,
      student?.email,
      student?.contacts,
      student?.address,
      student?.birth_date,
      student?.studentParentInfo?.father_name,
      student?.studentParentInfo?.mother_name,
    ];
    const filledFields = fields.filter(field => field).length;
    return (filledFields / fields.length) * 100;
  };

  return (
    <>
      <Head title="Student Profile" />
      <div className="min-h-screen bg-background">
        <SidebarDemo>
          <div className="flex flex-col flex-1 w-full h-full gap-4 p-2 bg-white border md:p-10 rounded-tl-2xl border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="mb-6">
                <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row">
                  <Avatar className="w-24 h-24 border-2 border-primary/20">
                    <AvatarImage src={page.props.auth.user?.profile_photo_url} />
                    <AvatarFallback className="text-2xl bg-primary/10">
                      {`${student?.first_name?.[0]}${student?.last_name?.[0]}`}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-bold">{`${student?.first_name} ${student?.last_name}`}</h1>
                    <p className="text-muted-foreground">Student ID: {student?.id}</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-2 md:justify-start">
                      <Badge variant="secondary">{student?.course?.code}</Badge>
                      <Badge variant="outline">{student?.academic_year}th Year</Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        {currentSemester}
                      </Badge>
                    </div>
                  </div>

                  <div className="w-full md:w-48">
                    <p className="mb-2 text-sm text-muted-foreground">Profile Completion</p>
                    <Progress value={calculateProfileCompletion()} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex flex-col gap-6 md:flex-row">
              {/* Left Sidebar Navigation */}
              <Card className="w-full md:w-64 h-fit">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {menuItems.map((item) => (
                      <Button
                        key={item.id}
                        variant={activeSection === item.id ? "secondary" : "ghost"}
                        className="justify-start w-full"
                        onClick={() => setActiveSection(item.id)}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </Button>
                    ))}
                  </nav>
                </CardContent>
              </Card>

              {/* Right Content Area */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeSection === 'overview' && (
                      <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          <Card>
                            <CardHeader>
                              <div className="flex items-center gap-2">
                                <RiGraduationCapLine className="w-5 h-5" />
                                <CardTitle className="text-lg">Academic Summary</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Course</span>
                                <span className="font-medium">{student?.course?.code}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Year Level</span>
                                <span className="font-medium">{student?.academic_year}th Year</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Semester</span>
                                <span className="font-medium">{currentSemester}</span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <div className="flex items-center gap-2">
                                <RiBookLine className="w-5 h-5" />
                                <CardTitle className="text-lg">Current Semester</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Enrolled Subjects</span>
                                <span className="font-medium">{student?.total_enrolled_subjects || 0}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Units</span>
                                <span className="font-medium">{student?.total_units || 0} Units</span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <div className="flex items-center gap-2">
                                <RiMailLine className="w-5 h-5" />
                                <CardTitle className="text-lg">Contact Information</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center gap-2">
                                <RiMailLine className="text-muted-foreground" />
                                <span className="text-sm">{student?.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <RiPhoneLine className="text-muted-foreground" />
                                <span className="text-sm">{student?.contacts}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Additional Overview Information */}
                        <div className="grid gap-6 md:grid-cols-2">
                          <Card>
                            <CardHeader>
                              <div className="flex items-center gap-2">
                                <RiUserLine className="w-5 h-5" />
                                <div>
                                  <CardTitle>Personal Overview</CardTitle>
                                  <CardDescription>Quick view of your information</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid gap-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                  <p className="mt-1">{`${student?.first_name} ${student?.middle_name || ''} ${student?.last_name}`}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Student Status</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                                      Active
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Address</p>
                                  <p className="mt-1">{student?.address || 'Not set'}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <div className="flex items-center gap-2">
                                <RiFileList3Line className="w-5 h-5" />
                                <div>
                                  <CardTitle>Quick Actions</CardTitle>
                                  <CardDescription>Frequently used features</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="grid gap-4">
                                <Button variant="outline" className="justify-start">
                                  <RiGraduationCapLine className="w-4 h-4 mr-2" />
                                  View Grades
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  <RiBookLine className="w-4 h-4 mr-2" />
                                  Class Schedule
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  <RiFileList3Line className="w-4 h-4 mr-2" />
                                  Request Documents
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  <RiUserLine className="w-4 h-4 mr-2" />
                                  Update Profile
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}

                    {activeSection === 'personal' && (
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <RiUserLine className="w-5 h-5" />
                              <div>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Your basic personal details</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                  <p className="mt-1">{`${student?.first_name} ${student?.middle_name || ''} ${student?.last_name}`}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                                  <p className="mt-1">{student?.birth_date || 'Not set'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Gender</p>
                                  <p className="mt-1">{student?.gender || 'Not set'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Civil Status</p>
                                  <p className="mt-1">{student?.civil_status || 'Not set'}</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                                  <p className="mt-1">{student?.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Contact Number</p>
                                  <p className="mt-1">{student?.contacts || 'Not set'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Address</p>
                                  <p className="mt-1">{student?.address || 'Not set'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Nationality</p>
                                  <p className="mt-1">{student?.nationality || 'Not set'}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <RiUserLine className="w-5 h-5" />
                              <div>
                                <CardTitle>Parent/Guardian Information</CardTitle>
                                <CardDescription>Emergency contact details</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Father's Name</p>
                                  <p className="mt-1">{student?.studentParentInfo?.father_name || 'Not set'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Father's Occupation</p>
                                  <p className="mt-1">{student?.studentParentInfo?.father_occupation || 'Not set'}</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Mother's Name</p>
                                  <p className="mt-1">{student?.studentParentInfo?.mother_name || 'Not set'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Mother's Occupation</p>
                                  <p className="mt-1">{student?.studentParentInfo?.mother_occupation || 'Not set'}</p>
                                </div>
                              </div>
                            </div>
                            <Separator />
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Emergency Contact</p>
                              <div className="grid gap-4 mt-2 md:grid-cols-2">
                                <div>
                                  <p className="text-sm text-muted-foreground">Contact Person</p>
                                  <p className="mt-1">{student?.studentParentInfo?.emergency_contact_person || 'Not set'}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Contact Number</p>
                                  <p className="mt-1">{student?.studentParentInfo?.contact_number || 'Not set'}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {activeSection === 'academic' && (
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <RiGraduationCapLine className="w-5 h-5" />
                              <div>
                                <CardTitle>Academic Information</CardTitle>
                                <CardDescription>Your academic details and progress</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Course</p>
                                  <p className="mt-1 font-medium">{student?.course?.code}</p>
                                  <p className="text-sm text-muted-foreground">{student?.course?.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Year Level</p>
                                  <p className="mt-1 font-medium">{student?.academic_year}th Year</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Current Semester</p>
                                  <p className="mt-1 font-medium">{currentSemester}</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Academic Status</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                                      Regular
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Total Units</p>
                                  <p className="mt-1 font-medium">{student?.total_units || 0} Units</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Curriculum Year</p>
                                  <p className="mt-1 font-medium">{student?.curriculum_year || 'Not set'}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <RiBookLine className="w-5 h-5" />
                              <div>
                                <CardTitle>Academic Progress</CardTitle>
                                <CardDescription>Your current academic standing</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Overall Progress</span>
                                <span className="text-sm text-muted-foreground">
                                  {student?.completed_units || 0} / {student?.total_curriculum_units || 0} Units
                                </span>
                              </div>
                              <Progress
                                value={((student?.completed_units || 0) / (student?.total_curriculum_units || 1)) * 100}
                                className="h-2"
                              />
                            </div>
                            <div className="grid gap-4 pt-4 md:grid-cols-4">
                              <Card>
                                <CardContent className="pt-6">
                                  <div className="text-2xl font-bold">{student?.gwa || '0.00'}</div>
                                  <p className="text-xs text-muted-foreground">General Average</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="pt-6">
                                  <div className="text-2xl font-bold text-green-500">
                                    {student?.completed_units || 0}
                                  </div>
                                  <p className="text-xs text-muted-foreground">Units Completed</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="pt-6">
                                  <div className="text-2xl font-bold text-blue-500">
                                    {student?.current_units || 0}
                                  </div>
                                  <p className="text-xs text-muted-foreground">Current Units</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="pt-6">
                                  <div className="text-2xl font-bold text-gray-500">
                                    {student?.remaining_units || 0}
                                  </div>
                                  <p className="text-xs text-muted-foreground">Remaining Units</p>
                                </CardContent>
                              </Card>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <RiCalendarLine className="w-5 h-5" />
                              <div>
                                <CardTitle>Academic History</CardTitle>
                                <CardDescription>Your academic records by semester</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {student?.academic_history?.map((history: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                  <div>
                                    <p className="font-medium">{history.semester}</p>
                                    <p className="text-sm text-muted-foreground">{history.academic_year}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">{history.gwa || '0.00'}</p>
                                    <p className="text-sm text-muted-foreground">GWA</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {activeSection === 'security' && (
                      <div className="space-y-6">
                        {page.props.jetstream.canUpdateProfileInformation && (
                          <UpdateProfileInformationForm user={page.props.auth.user} />
                        )}
                        {page.props.jetstream.canUpdatePassword && (
                          <UpdatePasswordForm />
                        )}
                        {page.props.jetstream.canManageTwoFactorAuthentication && (
                          <TwoFactorAuthenticationForm
                            requiresConfirmation={confirmsTwoFactorAuthentication}
                          />
                        )}
                        <LogoutOtherBrowserSessions sessions={sessions} />
                        {page.props.jetstream.hasAccountDeletionFeatures && (
                          <DeleteUserForm />
                        )}
                      </div>
                    )}

                    {/* Add other sections as needed */}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </SidebarDemo>
      </div>
    </>
  );
}
