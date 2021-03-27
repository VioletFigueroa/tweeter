$(document).ready(function() {
  
  
  const tweets = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text:
          "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];


  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").append($tweet);
    }
  };


  const createTweetElement = (tweet) => {
    const $tweet = $(`
    <article class="tweet">
      <header>
        <div id="user">
          <img src=${tweet.user.avatars} />
          ${tweet.user.name}
        </div>
        <div id="handle">${tweet.user.handle}</div>
      </header>
      <div class="tweet-text">
      ${tweet.content.text}
      </div>
      <footer>
        <div>${tweet.created_at}</div>
        <div>
          <i class="fas fa-flag" name="flag"></i>
          <i class="fas fa-retweet" name="retweet"></i>
          <i class="fas fa-heart" name="heart"></i>
        </div>
      </footer>
    </article>
  `);
    return $tweet;
  };


  renderTweets(tweets);
});
