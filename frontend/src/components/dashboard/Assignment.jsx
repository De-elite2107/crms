import React, { useEffect, useState } from 'react'
import { fetchAssignments, submitAssignment } from '../api';
import styled from 'styled-components';
import { extractedDate, extractedTime } from '../dateextractor';
import { useToast } from '../ToastContext';

const AssignmentSubmit = (assignment_id, question) => {
    const [response, setResponse] = useState('')
    const notify = useToast();
    const ass_id = assignment_id.assigment_id;
    const quest = assignment_id.question;
    console.info('details', ass_id, quest)
    const handleSubmit = async(event) => {
        event.preventDefault();
        const url = submitAssignment(ass_id, response);
        try {
            const response = await url
    
            // Handle success
            console.log(response); // The response data from the server
            notify("Successfully submitted", 'success');
        } catch (error) {
            if (error.response) { // This is expected to be an object with arrays of messages
                console.error('Error:', error);
                notify("Already submitted", 'error');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                notify('Submission failed: Server down', 'error');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error:', error.message);
                notify('Submission failed: An unexpected error occurred.', 'error');
            }
        }
    }
    return(
        <div className='container'>
            <h1 className='row  mb-4 text-3xl'>Assignment response</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <h2><strong>Question</strong></h2>
                    <p className='mb-5'>{quest}</p>
                    <p><strong>Answer</strong></p>
                    <textarea value={response} onChange={(e)=>{setResponse(e.target.value)}} className='w-full mb-4' rows={10} required></textarea>
                </label>
                <div className='flex'>
                    <button type='reset' onClick={()=>{setResponse('')}} className='bg-red-400 w-1/2 rounded-md p-2 text-white block hover:greyBg duration-500'>Reset</button>
                    <button type='submit' className='greenBg w-1/2 rounded-md p-2 text-white block hover:greyBg duration-500'>Submit</button>
                </div>
            </form>
        </div>
    )
}

const Assignment = () => {
    const [respond, setRespond] = useState(false)
    const [question, setQuestion] = useState('')
    const [assignments, setAssignments] = useState([]);
    const [assigmentId, setAssignmentId] = useState(0)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAssignments = async () => {
            try {
                const data = await fetchAssignments();
                console.log('Fetched assignments', data)
                setAssignments(data); // Set the fetched courses in state
            } catch (err) {
                setError(err); // Handle any errors
            } finally {
                setLoading(false); // Set loading to false once done
            }
        };

        getAssignments(); // Call the fetch function
    }, []); // Empty dependency array means this runs once on mount

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching courses: {error.message}</p>;

  return (
    <>
        {respond ? (
            <AssignmentSubmit assigment_id={assigmentId} question={question}/>
        ) : (
            <div className='container'>
                <h1 className='row  mb-4 text-3xl'>Assignments</h1>
                <div className="row">
                {assignments.map((assignment) => (
                    <div key={assignment.id} className="col-md-4 mb-3 w-1/3">
                        <div className="h-full">
                            <div className="flex card-body flex-col justify-between h-full">
                                <h3 className="card-title text-xl"><strong>{assignment.title}</strong></h3>
                                <p className="card-text"><strong>Course:</strong> {assignment.course.title}</p>
                                <p className="card-text"><strong>Question:</strong> {assignment.question}</p>
                                <p className="card-text"><strong>Date due:</strong> {extractedDate(assignment.due_date)} by {extractedTime(assignment.due_date)}</p>
                                <p className="card-text"><strong>Instructor:</strong> {assignment.course.instructor.username}</p>
                                <BtnWrapper>
                                <button onClick={()=> {setQuestion(assignment.question); setAssignmentId(assignment.id); setRespond(!respond);}} className='purpleBg rounded-md p-2 text-white w-full hover:greyBg duration-500'>Submit Assignment</button>
                                </BtnWrapper>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        )}
    </>
  )
}
const BtnWrapper = styled.div`
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
export default Assignment;