import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
})

const getInterviewData = async (mockId,token) => {
    const res = await api.get(`/interview/${mockId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

const getAllInterviews = async (token) => {
    const res = await api.get(`/interview/all`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

const deleteFeedback = async (feedbackId, token) => {
    const res = await api.delete(`/feedback/${feedbackId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

const generateFeedback = async (mock_id,activeQuestion,question,transcript,email,token)=>{
    const res = await api.post('/generate/feedback',{
        mock_id:mock_id,
        ques_no:activeQuestion,
        ques:question.question,
        ans:question.answer,
        user_ans:transcript,
        email:email,
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    return res.data;
}

const getFeedback = async (mock_id,token)=>{
    const res = await api.get(`/feedback/${mock_id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

const generateInterview = async (url,data,headers)=>{
    const res = await api.post(`generate${url}`,data,{headers})
    return res.data;
}

const deleteInterview = async (mockId,token)=>{
    const res = await api.delete(`/interview/delete/${mockId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return res;
}

export {getInterviewData, getAllInterviews, deleteFeedback,generateFeedback, generateInterview, deleteInterview,getFeedback};