// Escape funtion to protect from XSS;
const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
/*Source:
  https://web.compass.lighthouselabs.ca/days/w04d3/activities/497
  */

const renderTweets = (tweets) => {
  $("#tweet-container").empty();
  for (const tweet of tweets.reverse()) {
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
        ${escape(tweet.user.name)}
      </div>
      <div id="handle">${escape(tweet.user.handle)}</div>
    </header>
    <div class="tweet-text">
    ${escape(tweet.content.text)}
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

$(document).ready(() => {
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then((res, err) => {
        renderTweets(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  $("form").submit(function (event) {
    event.preventDefault();
    const tweetLength = $("textarea.tweet-text").val().length;
    if (tweetLength > 140 || tweetLength <= 0) {
      return $("#error-message").slideDown();
    }
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize(),
    }).then(() => {
      loadTweets();
      $("#error-message").slideUp();
      $("textarea.tweet-text").val("");
      $("#char-counter").val(140);
    });
  });
  loadTweets();
});