import axios from 'axios';

export default axios.create({
    baseURL: 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
    params: {
        part : 'snippet',
        maxResults : 5,
    }
});