import React, { useEffect, useState } from 'react'
import ShortCard from '../card';
import { fetchCourses, fetchResource } from '../api';

// ResourceDetail
const ResourceDetail = ({ courseid, course }) => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const courseId = courseid;
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const data = await fetchResource(courseId);
                setResources(data);
                console.info(data) // Set the fetched courses in state
            } catch (err) {
                setError(err); // Handle any errors
            } finally {
                setLoading(false); // Set loading to false once done
            }
        };

        fetchResources();
    }, [courseId]);

    if (loading) return <p>Loading resources...</p>;
    if (error) 
        console.error("Error", error);
        // return <p>Error fetching resources: {error.message}</p>;
    
    return (
        <div className="container mt-4">
            <ul className="list-group">
                {resources.map(resource => (
                    <li key={resource.id} className="list-group-item">
                        <div className='mb-3'>
                            <h4 className='text-3xl'><strong>Course details</strong></h4>
                            <h5><strong>Title:</strong> {resource.course.title}</h5>
                            <p><strong>Description:</strong> {resource.course.description}</p>
                            <p><strong>Unit:</strong> {resource.course.unit}</p>
                            {resource.url &&<><strong>URL:</strong> {resource.url}</>}
                        </div>
                        <div className='mb-3'>
                            <h4 className='text-lg'><strong>Resource details</strong></h4>
                            <h5><strong>Files</strong></h5>
                            <ul className='list-group'>
                                {resource.files.map(file => (
                                    <li key={file.id} className="list-group-item">
                                        <a href={file.file}>{file.file.split('/').pop()}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className='text-lg'><strong>Lecturer details</strong></h4>
                            <p><strong>Name:</strong> {resource.course.instructor.username}</p>
                            <p><strong>Email:</strong> {resource.course.instructor.email}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewResource, setViewResource] = useState(false)
    const [courseId, setCourseId] = useState(0)
    const [course, setCourse] = useState('')
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const data = await fetchCourses();
                setCourses(data); // Set the fetched courses in state
            } catch (err) {
                setError(err); // Handle any errors
            } finally {
                setLoading(false); // Set loading to false once done
            }
        };

        getCourses(); // Call the fetch function
    }, []); // Empty dependency array means this runs once on mount

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching courses: {error.message}</p>;
  return (
    <div className="container mt-4">
            <>
                {viewResource ? (
                    <ResourceDetail courseid={courseId} course={course}/>
                ) : (
                    <>
                        <h1 className="row mb-4 text-3xl">Course List</h1>
                        <div className="row">
                            {courses.map(course => (
                                <ShortCard
                                buttonName='View details'
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                description={course.description}
                                unit={course.unit}
                                status={course.status}
                                instructor={course.instructor.username}
                                action={()=>{setViewResource(!viewResource);setCourseId(course.id);setCourse(course.title);}}
                                />
                            ))}
                        </div>
                    </>
                )}
            </>
        </div>
  )
}
export default Courses