import { BadgeInfo, PlayCircle, Lock } from 'lucide-react';
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import BuyCourseButton from '../../components/BuyCourseButton';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [purchasedCourse, setPurchasedCourse] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/v1/course/${courseId}`, { withCredentials: true });
        setCourse(data?.course);

        // Optional: Check if user already purchased
        setPurchasedCourse(data?.isPurchased || false);
      } catch (err) {
        toast.error("Failed to load course details");
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (!course) return <p className="mt-10 text-center">Loading...</p>;

  return (
    <div className='mt-20 space-y-5'>
      <div className='bg-[#2D2F31] text-white'>
        <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
          <h1 className='font-bold text-2xl md:text-3xl'>{course.courseTitle}</h1>
          <p className='text-base md:text-lg'>{course.subTitle}</p>
          <p>Created By{" "}
            <span className='text-[#C0C4FC] underline italic'>
              {course?.instructor?.name || 'Unknown Instructor'}
            </span>
          </p>
          <div className='flex items-center gap-2 text-sm'>
            <BadgeInfo size={16} />
            <p>Last update {new Date(course.updatedAt).toLocaleDateString()}</p>
          </div>
          <p>Students enrolled: {course.enrolledCount || 0}</p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10'>
        <div className='w-full lg:w-1/2 space-y-5'>
          <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
          <p className='text-sm'>{course.description}</p>

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{course.lectures?.length || 0} lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures?.map((lecture, idx) => (
                <div key={lecture._id || idx} className='flex items-center gap-3 text-sm'>
                  <span>
                    {purchasedCourse ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture.title}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className='w-full lg:w-1/3'>
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className='w-full aspect-video mb-4 bg-gray-300 flex items-center justify-center text-sm'>
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt="Course" className="w-full h-full object-cover" />
                ) : (
                  "Course Preview"
                )}
              </div>

              <h1 className="text-lg font-semibold">{course.courseTitle}</h1>
              <Separator className="my-2" />
              <h1 className='text-lg md:text-xl font-semibold'>₹{course.price}</h1>
            </CardContent>

            <CardFooter className="flex justify-center p-4">
              {purchasedCourse ? (
                <Button className="w-full">Continue Course</Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;































