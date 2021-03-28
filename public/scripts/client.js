$(document).ready(() => {
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


  $("form").submit(function(event) {
    event.preventDefault();
    const tweetLength = $("textarea.tweet-text").val().length;
    if (tweetLength > 140) {
      return alert(
        "Please shorten tweet to 140 char or less;"
      );
    }
    if (tweetLength <= 0) {
      return alert(
        "Please enter a tweet into the text box;"
      );
    }
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    }).then(() => {
      console.log("Ajax successful");
      loadTweets();
      $("textarea.tweet-text").val("");
      $("#char-counter").val(140);
    });
  });
  loadTweets();
});