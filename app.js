const discussContainer = document.getElementById('discussContainer');
const showReadPosts = document.getElementById('showReadPosts');
const countRead = document.getElementById('countRead');
const latestPostCards = document.getElementById('latestPostCards');

let markAsRead = 0;

const allPosts = async() =>{
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await response.json();
    const posts = data.posts;
    showByCategory(posts);
}

const showByCategory = (posts) =>{
  discussContainer.innerHTML = ``;
        posts.forEach(post => {
        const card = document.createElement('div');
        card.innerHTML = `
        <!-- each card -->
        <div class="flex flex-col lg:flex-row items-center lg:items-start gap-6 bg-[#797DFC1A] p-10 rounded-3xl">
          <!-- profile pic -->
          <div class="relative w-[72px]">
            <img class="w-[72px] rounded-2xl" src="${post.image}" alt="">
            <div class="w-[18px] h-[18px] ${post.isActive === true ? 'bg-green-500': 'bg-red-500'} rounded-full absolute -top-2 -right-2"></div>
          </div>
          <!-- right information -->
          <div>
            <!-- cat and author -->
            <div class="flex gap-5 mb-3">
              <p># ${post.category}</p>
              <p>Author : ${post.author.name}</p>
            </div>
            <!-- title -->
            <div class="">
              <h3 class="text-xl font-bold mb-3">${post.title}</h3>
              <p class="lg:w-[689px]">${post.description}</p>
              <hr class="border border-[#12132D40] border-dashed my-5">
            </div>
            <!-- Views, comments -->
            <div class="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-6 lg:gap-0">
              <div class="flex gap-6">
                <div class="flex gap-3 items-center">
                  <i class="fa-regular fa-message text-xl"></i>
                  <span>${post.comment_count}</span>
                </div>
                <div class="flex gap-3 items-center">
                  <i class="fa-regular fa-eye text-xl"></i>
                  <span>${post.view_count}</span>
                </div>
                <div class="flex gap-3 items-center">
                  <i class="fa-regular fa-clock text-xl"></i>
                  <span>${post.posted_time} min</span>
                </div>
              </div>
              <button onclick="postRead('${post.title.replace("'", "\\'")}',${post.view_count})" class="bg-green-500 w-[28px] h-[28px] rounded-full text-center cursor-pointer">
                <i class="fa-regular fa-envelope-open text-white"></i>
              </button>
            </div>
          </div>
        </div>
        `
        discussContainer.appendChild(card);       
    });
}

function postRead(title, views){
    markAsRead++;
    countRead.innerHTML= markAsRead;
    const doneRead = document.createElement('div');
    doneRead.classList = `p-4 flex gap-2 bg-[#12132d0b] justify-between rounded-2xl`
    doneRead.innerHTML = `
    <h3 class="font-semibold w-[212px]">${title}</h3>
    <div class="flex items-center gap-2">
      <i class="fa-regular fa-eye"></i>
      <span>${views}</span>
    </div>
    `
    showReadPosts.appendChild(doneRead)
}

const latestPostFetch = async() => {
  const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const data = await response.json();
  showLatestPosts(data);
}

const showLatestPosts = (posts) => {
  posts.forEach(post=> {
    const postCard = document.createElement('div');
    postCard.classList = `card border-2`;
    postCard.innerHTML = `
    <figure class="px-10 pt-10">
      <img src="${post.cover_image}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body">
      <div class="flex gap-2 items-center mb-3">
        <i class="fa-regular fa-calendar text-xl"></i>
        <span>${post.author.posted_date === undefined ? 'No publish date' : post.author.posted_date}</span>
      </div>
      <div class="space-y-3">
        <h4 class=" text-lg font-extrabold leading-7">${post.title}</h4>
        <p class="leading-7">${post.description} </p>
      </div>
      <!-- author -->
      <div class="mt-4 flex gap-4 items-center">
        <!-- author image -->
        <div>
          <img class="w-[44px] rounded-full" src="${post.profile_image}" alt="">
        </div>
        <div>
          <h4 class="font-bold">${post.author.name}</h4>
          <p>${post.author.designation === undefined ? "Unknown": post.author.designation}</p>
        </div>
      </div>
    </div>
    `
    latestPostCards.appendChild(postCard);
  })
}

const searchPosts = () =>{
  const searchBtn = document.getElementById('search');
  const searchValue = searchBtn.value;
  searchByCategory(searchValue);
}

const searchByCategory = async(categoryName) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`)
  const data = await response.json();
  const mainData = data.posts;
  showByCategory(mainData)
  
}

latestPostFetch()
allPosts();