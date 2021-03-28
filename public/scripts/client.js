// const dayjs = require('dayjs');
//dayjs().format();
//const relativeTime = require('dayjs/plugin/relativeTime');
//dayjs.extend(relativeTime);

$(document).ready(() => {
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
        <div>${moment(tweet.created_at).fromNow()}</div>
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

  $("form").submit(function(event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    }).then(() => {
      console.log("Ajax successful");
    });
  });
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).then((res, err) => {
      renderTweets(res);
    }).catch(err => {
      console.log(err);
    });
  };
  loadTweets();
});
