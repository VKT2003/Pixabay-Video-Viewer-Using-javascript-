const fetchVideoButton = document.getElementById('fetchVideoButton');
const videoList = document.getElementById('videoList');
const videoContainer = document.getElementById('videoContainer');
const pixabayApiKey = '44653966-e6f71c4209223d9d3c4784b7a'; // Replace with your Pixabay API key

fetchVideoButton.addEventListener('click', fetchRandomVideos);

function fetchRandomVideos() {
    fetch(`https://pixabay.com/api/videos/?key=${pixabayApiKey}&per_page=100`, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const videos = data.hits;
        if (videos.length === 0) {
            throw new Error('No videos found.');
        }
        displayVideoThumbnails(videos);
    })
    .catch(error => console.error('Error fetching videos:', error));
}

function displayVideoThumbnails(videos) {
    videoList.innerHTML = '';
    videos.forEach((video, index) => {
        const thumbnailUrl = video.videos.large.thumbnail;
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.dataset.index = index;
        videoItem.innerHTML = `
            <img src="${thumbnailUrl}" alt="Video Thumbnail">
        `;
        videoItem.addEventListener('click', () => {
            const videoUrl = video.videos.large.url;
            displayVideo(videoUrl);
        });
        videoList.appendChild(videoItem);
    });
}

function displayVideo(videoUrl) {
    videoContainer.innerHTML = `
        <video controls autoplay>
            <source src="${videoUrl}" type="video/mp4">
            <source src="${videoUrl}" type="video/webm">
            Your browser does not support the video tag.
        </video>
    `;
}
