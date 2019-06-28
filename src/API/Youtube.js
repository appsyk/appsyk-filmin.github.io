import axios from 'axios';

const KEY = 'AIzaSyCESu55UdSNFo3rlGu7V2iWpwZTKb6DtZU';
// 'AIzaSyDHrEJ4SLaQdqmY84jwoX1hPgrr54G-mN4';

export default axios.create({
    baseURL:'https://www.googleapis.com/youtube/v3',
    params:{
        part:'snippet',
        maxResults: 25,
        key: KEY
    }
})
