/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//takes in a tweet object and returns a tweet <article> element containing the entire HTML structure of the tweet.
// console.log($tweet)


$(document).ready(function() {
  $('div.alert').hide();
  $("form.new-tweet").submit(function(event) {
    $('div.alert').hide();
    event.preventDefault();
    console.log("how many");
    const serial =  $('form.new-tweet').serialize();
    if (serial.length === 5 || serial.length > 145) {
      return $('div.alert').toggle();
    }  
$.ajax('/tweets', { method: 'POST', data: serial})
      .then(function() {
        loadTweets();
        console.log(event);
      }); 
  }); 
  const loadTweets = function() {
    $.ajax({
      url: ('/tweets'),
      data: 'data',
      success: renderTweets,
    });
  };
  const renderTweets = function(tweets) {
    $('.tweet-list')[0].innerHTML = '';

    for (let key in tweets) {
      createTweetElement(tweets[key]);
    }

  };
  //timeSinceTweet
  //taken from stackoverflow and modified
  //https://stackoverflow.com/questions/19540077/converting-unix-time-to-minutes-ago-in-javascript

  const timeSinceTweet = function(ts) {
  
    // let current = new Date()
    // currentTimeStamp = current.getTime
    // let timeAgo = current - ts;
    let d = new Date();  // Gets the current time
    let nowTs = Math.floor(d.getTime() / 1000); 
  
    let seconds = nowTs - (ts / 1000);
    console.log(seconds);
    console.log(ts);

    // more that two days
    if (seconds > 2 * 24 * 3600) {
      return "a few days ago";
    }
    // a day
    if (seconds > 24 * 3600) {
      return "yesterday";
    }

    if (seconds > 3600) {
      return "a few hours ago";
    }
    if (seconds > 1800) {
      return "Half an hour ago";
    }
    if (seconds > 60) {
      return Math.floor(seconds / 60) + " minutes ago";
    }
  }

  const createTweetElement = function(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    let $div = $('<div>').addClass('header2');
    let $img = $('<img>' + '>').attr('src', `${tweet.user.avatars}` + '>');
    let $p1 = $('<p1>' + tweet.user.name + '</p1>');
    let $p2 = $('<p2>' + tweet.user.handle + '</p2>');
    let $div2 = $('<div2>').addClass('footer');
    let $textarea = $('<textarea>' + tweet.content.text + '</textarea>');
    let $p = $('<p>' + 'created at ' +  timeSinceTweet(tweet.created_at) + '</p>');
    $div.append($img);
    $div.append($p1);
    $div.append($p2);
    $tweet.append($div);
    $div2.append($textarea);
    $div2.append($p);
    $tweet.append($div2);

    const $postedTweet = $('.tweet-list');

    $postedTweet.prepend($tweet);
  };


  loadTweets();
});
