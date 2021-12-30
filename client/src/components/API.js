import axios from 'axios';

const renderResumes = async (resCallback) => {
    axios.get('https://mystyler.herokuapp.com/user/resumes')
    //axios.get('http://localhost:4000/user/resumes')
    .then((res) => {
        resCallback(res)
    })
}

export {
    renderResumes,
}